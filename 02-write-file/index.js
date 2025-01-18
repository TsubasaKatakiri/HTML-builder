const fs = require('fs');
const readline = require('readline');

const file = fs.createWriteStream('text.txt');

process.stdout.write(
  'Welcome to 02-write-file task! Type some text and press ENTER to write it into text.txt. \nType exit or press CTRL + C to exit\n',
);

const rl = readline.createInterface({
  input: process.stdin,
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
