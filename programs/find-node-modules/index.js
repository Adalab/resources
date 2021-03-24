const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const currentPath = process.argv[2] || '.';

const consoleColors = {
  delete: '\x1b[32m',
  keys: '\x1b[33m',
  feedback: '\x1b[37m'
};

const findFolderRecursive = (path, result = []) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(file => {
      const currentPath = (path + '/' + file).replace('//', '/');
      if (file === 'node_modules') {
        result.push(currentPath);
      } else if (fs.lstatSync(currentPath).isDirectory()) {
        findFolderRecursive(currentPath, result);
      }
    });
  }
  return result;
};

const listenKeypressEvents = callbacks => {
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.on('keypress', (key, data) => {
    if (data.ctrl && data.name === 'c') {
      process.exit();
    } else {
      const callback = callbacks.find(callback => callback.keys.includes(data.name));
      if (callback) {
        callback.callback();
      }
    }
  });
};

const showNextDeleteMessage = () => {
  pathIndex += 1;
  if (pathIndex >= paths.length) {
    process.exit();
  } else {
    console.log(
      consoleColors.delete,
      `Do you want to delete ${path.join(__dirname, paths[pathIndex])}?`,
      consoleColors.keys,
      '[enter/y/n]'
    );
  }
};

listenKeypressEvents([
  {
    keys: ['y', 'Y', 'return'],
    callback: () => {
      console.log(consoleColors.feedback, `Deleting ${path.join(__dirname, paths[pathIndex])}`);
      spawnSync('rm', ['-rf', paths[pathIndex]]);
      showNextDeleteMessage();
    }
  },
  {
    keys: ['n', 'N'],
    callback: () => {
      showNextDeleteMessage();
    }
  },
  {
    keys: ['escape'],
    callback: () => {
      process.exit();
    }
  }
]);

console.log(`Searching node_modules in ${path.join(__dirname, currentPath)}`);

let pathIndex = -1;
const paths = findFolderRecursive(currentPath);

console.log(`Found ${paths.length} node_modules/ directories`);

showNextDeleteMessage();
