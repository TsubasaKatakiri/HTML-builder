const fs = require('fs');
const path = require('path');

const dirPath = path.resolve('./secret-folder');

fs.readdir(
  dirPath,
  {
    withFileTypes: true,
  },
  (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      const filePath = `${dirPath}/${file.name}`;
      fs.stat(filePath, (err, stat) => {
        if (err) throw err;
        if (stat.isFile()) {
          const { name, ext } = path.parse(filePath);
          process.stdout.write(
            `${name} - ${ext.slice(1)} - ${(stat.size / 1024).toFixed(3)} kb\n`,
          );
        }
      });
    });
  },
);
