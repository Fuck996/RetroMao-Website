"""从 App 模型生成网站用的包装盒 GLB。

几何、材质和正面贴图槽与 App 完全相同。背面和书脊贴图含有厂商商标，
不能出现在公开网站上，这里换成取自原图的单色；其余数据不变，并丢弃未引用的数据。

用法：把网站仓库放在主仓库的 website/ 目录下，运行 python scripts/build-web-models.py
"""
import io
import json
import pathlib
import re
import struct

from PIL import Image, ImageStat

ROOT = pathlib.Path(__file__).resolve().parents[2]
SRC = ROOT / 'app/src/main/assets/models'
OUT = ROOT / 'website/public/models'
DATA = ROOT / 'website/src/data/models.json'
STRIP = re.compile(r'(^|[-_ ])(back|spine)$', re.I)
# 只发布首页游戏库实际用到的机种，与 src/data/site.ts 的 demoGames 对应。
PLATFORMS = ('gb', 'sfc', 'md')


def read_glb(path):
    raw = path.read_bytes()
    length = struct.unpack_from('<I', raw, 12)[0]
    doc = json.loads(raw[20:20 + length])
    bin_start = 20 + length
    bin_len = struct.unpack_from('<I', raw, bin_start)[0]
    return doc, raw[bin_start + 8:bin_start + 8 + bin_len]


def solid_png(data):
    image = Image.open(io.BytesIO(data)).convert('RGB')
    mean = tuple(int(v) for v in ImageStat.Stat(image).mean)
    out = io.BytesIO()
    Image.new('RGB', (4, 4), mean).save(out, 'PNG')
    return out.getvalue()


def rewrite(path, target):
    doc, binary = read_glb(path)
    views = doc['bufferViews']
    replaced, kept = [], []
    payload = {}
    for image in doc.get('images', []):
        view = views[image['bufferView']]
        start = view.get('byteOffset', 0)
        data = binary[start:start + view['byteLength']]
        if STRIP.search(image.get('name', '')):
            payload[image['bufferView']] = solid_png(data)
            image['mimeType'] = 'image/png'
            replaced.append(image['name'])
        else:
            kept.append(image.get('name', '?'))
    out = bytearray()
    for index, view in enumerate(views):
        start = view.get('byteOffset', 0)
        data = payload.get(index, binary[start:start + view['byteLength']])
        while len(out) % 8:
            out.append(0)
        view['byteOffset'] = len(out)
        view['byteLength'] = len(data)
        out += data
    while len(out) % 4:
        out.append(0)
    doc['buffers'][0]['byteLength'] = len(out)
    text = json.dumps(doc, separators=(',', ':'), ensure_ascii=False).encode('utf8')
    text += b' ' * (-len(text) % 4)
    total = 12 + 8 + len(text) + 8 + len(out)
    target.write_bytes(
        struct.pack('<4sII', b'glTF', 2, total)
        + struct.pack('<I4s', len(text), b'JSON') + text
        + struct.pack('<I4s', len(out), b'BIN\0') + bytes(out))
    return replaced, kept


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    catalog = json.loads((SRC / 'catalog.json').read_text(encoding='utf8'))['platforms']
    mapping, seen = {}, {}
    for platform in PLATFORMS:
        name = catalog[platform]['packaging']
        mapping[platform] = name
        if name not in seen:
            seen[name] = rewrite(SRC / name, OUT / name)
    DATA.write_text(json.dumps(mapping, indent=2) + '\n', encoding='utf8', newline='\n')
    names = sorted({n for _, kept in seen.values() for n in kept})
    size = sum(p.stat().st_size for p in OUT.glob('*.glb'))
    print(len(mapping), 'platforms', len(seen), 'files', round(size / 1048576, 1), 'MiB')
    print('kept images:', names)
    print('no back/spine:', [k for k, (r, _) in seen.items() if len(r) < 2])


if __name__ == '__main__':
    main()
