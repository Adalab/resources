const fs = require('fs');
const path = process.argv[2] || '.';

const findFolderRecursive = path => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(file => {
      const currentPath = (path + '/' + file).replace('//', '/');
      if (file === 'node_modules') {
        console.log(currentPath);
      } else if (fs.lstatSync(currentPath).isDirectory()) {
        findFolderRecursive(currentPath);
      }
    });
  }
};

console.log('Searching in ' + path);

findFolderRecursive(path);
