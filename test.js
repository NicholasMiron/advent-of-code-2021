const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const getFiles = (curDir, regexp) => {
  const matchedFiles = [];
  if (!fs.existsSync(curDir)) {
    return;
  }

  const pathFiles = fs.readdirSync(curDir);
  pathFiles.forEach((file) => {
    const curDirFilePath = path.join(curDir, file);
    const fileLstat = fs.lstatSync(curDirFilePath);
    if (fileLstat.isFile()) {
      if ((new RegExp(regexp)).test(file)) {
        matchedFiles.push(curDirFilePath);
      }
    } else if (fileLstat.isDirectory()) {
      matchedFiles.push(...getFiles(curDirFilePath, regexp));
    }
  });

  return matchedFiles;
};

getFiles(path.join(__dirname, 'problems'), '.*\.(spec|test)\.js').forEach((testFilePath) => {
  const forkArgs = [];
  if (process.argv.includes('-s') || process.argv.includes('--solution')) {
    forkArgs.push('-s');
  }

  cp.fork(testFilePath, forkArgs);
})