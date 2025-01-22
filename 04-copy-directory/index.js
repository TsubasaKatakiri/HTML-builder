const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
  if (err) throw err;
});

fs.readdir(path.join(__dirname, 'files'), (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    const srcPath = `${path.join(__dirname, 'files')}/${file}`;
    const destPath = `${path.join(__dirname, 'files-copy')}/${file}`;
    fs.copyFile(srcPath, destPath, (err) => {
      if (err) throw err;
    });
  });
});
