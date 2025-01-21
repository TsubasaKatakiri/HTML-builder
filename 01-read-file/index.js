const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'text.txt');

async function readChunks(readableStream) {
  for await (const chunk of readableStream) {
    process.stdout.write(chunk);
  }
}

const readableStream = fs.createReadStream(filePath, { encoding: 'utf-8' });
readChunks(readableStream);
