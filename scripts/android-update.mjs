import { createHash, verify, X509Certificate } from 'node:crypto';

const releaseCertificate = 'c14cb8b07b89401dc2cb21351f65d09f3b78c7ba27dae5b7d58ea8c49053d102';

export function hasAndroidUpdateManifest(version) {
  const [major, minor] = version.split('.').map(Number);
  return major > 1 || (major === 1 && minor >= 1);
}

export function verifyAndroidUpdateManifest(bytes, version, size, sha256) {
  if (bytes.length > 8192) throw new Error('Android 更新清单过大');
  const envelope = JSON.parse(bytes.toString('utf8'));
  const certBytes = Buffer.from(envelope.certificate, 'base64');
  if (createHash('sha256').update(certBytes).digest('hex') !== releaseCertificate) {
    throw new Error('Android 更新清单的证书与正式发布证书不符');
  }
  const payload = Buffer.from(envelope.payload, 'base64');
  const key = new X509Certificate(certBytes).publicKey;
  if (!verify('RSA-SHA256', payload, key, Buffer.from(envelope.signature, 'base64'))) {
    throw new Error('Android 更新清单的签名无效');
  }
  const update = JSON.parse(payload.toString('utf8'));
  if (update.schema !== 1 || update.version !== version || update.sizeBytes !== size || update.sha256 !== sha256 ||
      !Number.isInteger(update.versionCode) || update.versionCode < 1 || update.versionCode > 2147483647) {
    throw new Error('Android 更新清单与 APK 不一致');
  }
}
