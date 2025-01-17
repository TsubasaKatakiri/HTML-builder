const fs = require('fs');
const path = require('path');
const filePath = path.resolve('./text.txt');

async function readChunks(readableStream) {
  for await (const chunk of readableStream) {
    console.log(chunk);
  }
}

const readableStream = fs.createReadStream(filePath, { encoding: 'utf-8' });
readChunks(readableStream);
