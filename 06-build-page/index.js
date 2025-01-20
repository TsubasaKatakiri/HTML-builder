const fs = require('fs');
const path = require('path');

const OUTPUT_DIRECTORY = 'project-dist';

fs.mkdir(path.join(__dirname, OUTPUT_DIRECTORY), { recursive: true }, (err) => {
  if (err) throw err;
});

function buildHTML() {
  const inFile = fs.createReadStream(path.join(__dirname, 'template.html'));
  let outFile = null;
  inFile.on('data', (data) => {
    let lineContents = data.toString();
    const regex = new RegExp(/({{[\s\S]+?}})/g);
    const tagContents = data
      .toString()
      .split(regex)
      .filter((item) => regex.test(item));
    for (const item of tagContents) {
      const fileName = item.replaceAll(/[{}]/g, '').concat('.html');
      const inFragment = fs.createReadStream(
        path.join(__dirname, 'components', fileName),
      );
      inFragment.on('data', (fragChunk) => {
        lineContents = lineContents.replace(item, fragChunk.toString());
        outFile = fs.createWriteStream(
          path.join(__dirname, OUTPUT_DIRECTORY, 'index.html'),
        );
        outFile.write(lineContents, (err) => {
          if (err) throw err;
        });
      });
    }
  });
}

function buildCSS() {
  const stylesDirPath = path.join(__dirname, 'styles');
  const stylesOutPath = path.join(__dirname, OUTPUT_DIRECTORY, 'style.css');
  const outFile = fs.createWriteStream(stylesOutPath);

  fs.readdir(stylesDirPath, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      const filePath = `${stylesDirPath}/${file.name}`;
      if (path.parse(filePath).ext === '.css' && file.isFile()) {
        fs.readFile(filePath, (err, data) => {
          if (err) throw err;
          outFile.write(data + '\n');
        });
      }
    });
  });
}

function copyAssets(dirPath, outPath) {
  fs.mkdir(outPath, { recursive: true }, (err) => {
    if (err) throw err;
  });
  fs.readdir(dirPath, { withFileTypes: true }, (err, entries) => {
    if (err) throw err;
    entries.forEach((entry) => {
      const srcPath = path.join(dirPath, entry.name);
      const destPath = path.join(outPath, entry.name);
      if (entry.isDirectory()) {
        copyAssets(srcPath, destPath, entry.name);
      } else {
        fs.copyFile(srcPath, destPath, (err) => {
          if (err) throw err;
        });
      }
    });
  });
}

buildHTML();
buildCSS();

const assetsDirPath = path.join(__dirname, 'assets');
const assetsOutPath = path.join(__dirname, OUTPUT_DIRECTORY, 'assets');
copyAssets(assetsDirPath, assetsOutPath);
