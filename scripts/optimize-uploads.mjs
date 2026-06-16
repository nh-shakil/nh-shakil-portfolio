import sharp from 'sharp';
import { readdir, rename, stat, unlink } from 'fs/promises';
import path from 'path';

const UPLOADS_ROOT = 'public/uploads';
const MAX_WIDTH = {
  projects: 1280,
  gallery: 1200,
  blog: 1200,
};
const WEBP_QUALITY = 82;

const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp']);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!IMAGE_EXT.has(ext)) {
    return;
  }

  const relative = path.relative(UPLOADS_ROOT, filePath);
  const topDir = relative.split(path.sep)[0] ?? '';
  const maxWidth = MAX_WIDTH[topDir] ?? 1280;
  const webpPath = filePath.replace(/\.(png|jpe?g)$/i, '.webp');

  const source = sharp(filePath, { failOn: 'none' }).rotate().resize({
    width: maxWidth,
    withoutEnlargement: true,
  });

  if (webpPath !== filePath) {
    await source.clone().webp({ quality: WEBP_QUALITY, effort: 4 }).toFile(webpPath);
  }

  if (ext === '.webp') {
    const tmpPath = `${filePath}.opt`;
    await source.clone().webp({ quality: WEBP_QUALITY, effort: 4 }).toFile(tmpPath);
    const { size: originalSize } = await stat(filePath);
    const { size: optimizedSize } = await stat(tmpPath);
    if (optimizedSize < originalSize) {
      await unlink(filePath);
      await rename(tmpPath, filePath);
    } else {
      await unlink(tmpPath);
    }
    return;
  }

  const { size: originalSize } = await stat(filePath);
  if (originalSize <= 180_000) {
    return;
  }

  const tmpPath = `${filePath}.opt`;
  if (ext === '.png') {
    await source
      .clone()
      .png({ compressionLevel: 9, palette: true })
      .toFile(tmpPath);
  } else if (ext === '.jpg' || ext === '.jpeg') {
    await source
      .clone()
      .jpeg({ quality: 85, mozjpeg: true })
      .toFile(tmpPath);
  } else {
    return;
  }

  const { size: optimizedSize } = await stat(tmpPath);
  if (optimizedSize < originalSize) {
    await unlink(filePath);
    await rename(tmpPath, filePath);
  } else {
    await unlink(tmpPath);
  }
}

async function main() {
  try {
    await stat(UPLOADS_ROOT);
  } catch {
    console.log('No uploads directory to optimize.');
    return;
  }

  const files = await walk(UPLOADS_ROOT);
  let optimized = 0;

  for (const file of files) {
    await optimizeImage(file);
    optimized += 1;
  }

  console.log(`Optimized ${optimized} upload file(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
