import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const isArtwork = (material: any) => /artwork/i.test(material?.name ?? '') || /artwork/i.test(material?.map?.name ?? '');
const isSpine = (material: any) => /spine/i.test(material?.name ?? '') && !/rib/i.test(material?.name ?? '');
const REST_ANGLE = -0.42;
const MAX_DRAG = 0.6;

export interface StageOptions {
  /** 光碟盒等透明材质需要折射底色；不设置时画布保持透明。 */
  background?: () => string;
}

/**
 * 渲染 App 的包装盒 GLB，并把封面放进模型自己的贴图槽。
 * 只在画布可见时绘制；可拖动，但限制角度。
 */
export class ModelStage {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(24, 1, 0.01, 100);
  private pivot = new THREE.Group();
  private loader = new GLTFLoader();
  private textures = new THREE.TextureLoader();
  private token = 0;
  private loadedUrl = '';
  private visible = false;
  private drag = 0;
  private dragTarget = 0;
  private dragging = false;
  private clock = new THREE.Clock();

  constructor(private canvas: HTMLCanvasElement, private options: StageOptions = {}) {
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
    this.renderer.setPixelRatio(Math.max(Math.min(devicePixelRatio, 3), 2));
    this.renderer.toneMapping = THREE.NeutralToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();
    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(1.5, 2.5, 4);
    this.scene.add(key, this.pivot);
    this.syncBackground();

    new ResizeObserver(() => this.resize()).observe(canvas);
    new IntersectionObserver(([entry]) => {
      this.visible = entry.isIntersecting;
      if (this.visible) this.renderer.setAnimationLoop(() => this.frame());
      else this.renderer.setAnimationLoop(null);
    }).observe(canvas);

    let startX = 0;
    let startDrag = 0;
    canvas.addEventListener('pointerdown', (e) => {
      this.dragging = true;
      startX = e.clientX;
      startDrag = this.dragTarget;
      canvas.setPointerCapture(e.pointerId);
    });
    canvas.addEventListener('pointermove', (e) => {
      if (!this.dragging) return;
      const next = startDrag + ((e.clientX - startX) / canvas.clientWidth) * 2;
      this.dragTarget = Math.max(-MAX_DRAG, Math.min(MAX_DRAG, next));
    });
    const release = () => { this.dragging = false; };
    canvas.addEventListener('pointerup', release);
    canvas.addEventListener('pointercancel', release);
  }

  syncBackground() {
    const color = this.options.background?.();
    this.scene.background = color ? new THREE.Color(color) : null;
  }

  private resize() {
    const { clientWidth: w, clientHeight: h } = this.canvas;
    if (!w || !h) return;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.frameModel();
  }

  private size = new THREE.Vector3(1, 1, 1);

  private frameModel() {
    const fit = Math.max(this.size.y, this.size.x / this.camera.aspect) * 1.1;
    const distance = fit / 2 / Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2));
    // App 的模型以毫米为单位，裁剪面要跟随模型尺寸。
    this.camera.near = fit * 0.05;
    this.camera.far = fit * 30;
    this.camera.position.set(0, 0, distance + this.size.z / 2);
    this.camera.lookAt(0, 0, 0);
    this.camera.updateProjectionMatrix();
  }

  private frame() {
    const t = this.clock.getElapsedTime();
    const still = reducedMotion();
    this.drag += (this.dragTarget - this.drag) * 0.14;
    if (!this.dragging) this.dragTarget *= 0.97;
    this.pivot.rotation.y = REST_ANGLE + this.drag + (still ? 0 : Math.sin(t * 0.55) * 0.16);
    this.pivot.rotation.x = 0.05 + (still ? 0 : Math.sin(t * 0.4) * 0.02);
    this.pivot.position.y = still ? 0 : Math.sin(t * 0.8) * this.size.y * 0.012;
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * 显示指定模型和封面。连续切换时只保留最后一次请求：
   * 模型已经就位就只换贴图，否则重新载入，不会留下旧模型配新封面。
   */
  async display(modelUrl: string, cover: string, spine?: string) {
    const token = ++this.token;
    const sameModel = modelUrl === this.loadedUrl;
    const [gltf, texture, spineTexture] = await Promise.all([
      sameModel ? null : this.loader.loadAsync(modelUrl),
      this.loadCover(cover),
      spine ? this.loadCover(spine) : null,
    ]);
    if (token !== this.token) return;

    if (gltf) {
      const model = gltf.scene;
      const box = new THREE.Box3().setFromObject(model);
      model.position.sub(box.getCenter(new THREE.Vector3()));
      this.size = box.getSize(new THREE.Vector3());
      this.clearPivot();
      this.pivot.add(model);
      this.loadedUrl = modelUrl;
      this.frameModel();
    }
    this.applyArtwork(this.pivot, texture);
    if (spineTexture) this.applySpine(this.pivot, spineTexture);
  }

  private async loadCover(cover: string) {
    const texture = await this.textures.loadAsync(cover);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.flipY = false;
    texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
    return texture;
  }

  /** 书脊使用模型自带的贴图变换，只替换图片。 */
  private applySpine(root: THREE.Object3D, source: THREE.Texture) {
    root.traverse((node) => {
      const mesh = node as THREE.Mesh;
      if (!mesh.isMesh) return;
      const materials = (Array.isArray(mesh.material) ? mesh.material : [mesh.material]) as THREE.MeshPhysicalMaterial[];
      materials.filter(isSpine).forEach((material) => {
        const old = material.map;
        const texture = source.clone();
        texture.needsUpdate = true;
        if (old) {
          texture.channel = old.channel;
          texture.rotation = old.rotation;
          texture.repeat.copy(old.repeat);
          texture.offset.copy(old.offset);
          texture.wrapS = old.wrapS;
          texture.wrapT = old.wrapT;
        }
        material.map = texture;
        material.needsUpdate = true;
      });
    });
  }

  private applyArtwork(root: THREE.Object3D, source: THREE.Texture) {
    const image = source.image as { width: number; height: number };
    const imageAspect = image.width / image.height;
    root.traverse((node) => {
      const mesh = node as THREE.Mesh;
      if (!mesh.isMesh) return;
      const materials = (Array.isArray(mesh.material) ? mesh.material : [mesh.material]) as THREE.MeshPhysicalMaterial[];
      materials.filter(isArtwork).forEach((material) => {
        // 用几何自身的尺寸：世界坐标包围盒会随盒子旋转而变，算出的比例不准。
        mesh.geometry.computeBoundingBox();
        const slot = mesh.geometry.boundingBox!.getSize(new THREE.Vector3());
        const slotAspect = slot.x / Math.max(slot.y, 1e-6);
        const texture = source.clone();
        texture.needsUpdate = true;
        // 与 App 的 FillModelLabel 相同：等比铺满、居中裁切，再叠加模型自带的贴图变换。
        const old = material.map;
        let repeatX = 1;
        let repeatY = 1;
        if (imageAspect > slotAspect) repeatX = slotAspect / imageAspect;
        else repeatY = imageAspect / slotAspect;
        const baseRepeat = old?.repeat ?? new THREE.Vector2(1, 1);
        const baseOffset = old?.offset ?? new THREE.Vector2(0, 0);
        texture.channel = old?.channel ?? 0;
        texture.rotation = old?.rotation ?? 0;
        texture.repeat.set(baseRepeat.x * repeatX, baseRepeat.y * repeatY);
        texture.offset.set(baseOffset.x + (baseRepeat.x * (1 - repeatX)) / 2, baseOffset.y + (baseRepeat.y * (1 - repeatY)) / 2);
        material.map = texture;
        material.color?.set(0xffffff);
        material.needsUpdate = true;
      });
    });
  }

  private clearPivot() {
    this.pivot.children.slice().forEach((child) => {
      this.pivot.remove(child);
      child.traverse((node) => {
        const mesh = node as THREE.Mesh;
        if (!mesh.isMesh) return;
        mesh.geometry.dispose();
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        materials.forEach((m: any) => {
          Object.values(m).forEach((v: any) => v?.isTexture && v.dispose());
          m.dispose();
        });
      });
    });
  }
}
