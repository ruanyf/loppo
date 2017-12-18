const path = require('path');

function getSiteId() {
  const currentDir = process.cwd();
  const currentDirArr = currentDir.split(path.sep);
  let dir = currentDirArr[currentDirArr.length - 1];
  if (dir.substr(-9) === '-tutorial') dir = dir.substr(0, dir.length - 9);
  return dir;
}

module.exports = getSiteId;
