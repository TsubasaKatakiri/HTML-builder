const fsPromise = require('fs/promises');
const path = require('path');

const originPath = path.join(__dirname, 'files');
const copyPath = path.join(__dirname, 'files-copy');

async function clearDirectory(copy) {
  try {
    const files = await fsPromise.readdir(copy);
    if (files) {
      for (const file of files) {
        await fsPromise.unlink(path.join(copy, file));
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function copyDirectory(origin, copy) {
  try {
    await fsPromise.mkdir(copy, { recursive: true });
    const files = await fsPromise.readdir(origin);
    await clearDirectory(copy);
    for (const file of files) {
      const srcPath = `${origin}/${file}`;
      const destPath = `${copy}/${file}`;
      await fsPromise.copyFile(srcPath, destPath);
    }
  } catch (error) {
    process.stderr.write(error);
  }
}

copyDirectory(originPath, copyPath);
