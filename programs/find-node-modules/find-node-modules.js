const fs = require('fs');

const findFolderRecursive = path => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(file => {
      const currentPath = path + '/' + file;
      if (file === 'node_modules') {
        console.log(currentPath);
      } else if (fs.lstatSync(currentPath).isDirectory()) {
        // recurse
        findFolderRecursive(currentPath);
      }
    });
  }
};

findFolderRecursive(process.argv[2] || '.');
