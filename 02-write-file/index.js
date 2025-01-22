const fs = require('fs');
const readline = require('readline');
const path = require('path');

const file = fs.createWriteStream(path.join(__dirname, 'text.txt'));

process.stdout.write(
  'Welcome to 02-write-file task! Type some text and press ENTER to write it into text.txt. \nType exit and press ENTER or press CTRL + C to exit\n',
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (data) => {
  if (data.toLocaleLowerCase() === 'exit') {
    rl.close();
  } else {
    file.write(data + '\n');
  }
});

process.on('exit', () => {
  process.stdout.write('Goodbye!');
});
