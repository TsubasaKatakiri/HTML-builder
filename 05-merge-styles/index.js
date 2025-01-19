const fs = require('fs');
const path = require('path');

const dirPath = path.resolve('./styles');
const outPath = path.join(__dirname, 'project-dist', 'bundle.css');
const outFile = fs.createWriteStream(outPath);

fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    const filePath = `${dirPath}/${file.name}`;
    if (path.parse(filePath).ext === '.css' && file.isFile()) {
      fs.readFile(filePath, (err, data) => {
        if (err) throw err;
        console.log(data);
        outFile.write(data + '\n');
      });
    }
  });
});
