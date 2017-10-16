const path = require('path');
const fs = require('fs-extra');

function readmeCheck(dir = process.cwd()) {
  const readme1 = path.resolve(dir, 'readme.md');
  const readme2 = path.resolve(dir, 'README.md');
  const readme3 = path.resolve(dir, 'README.MD');
  if (
    fs.existsSync(readme1) ||
    fs.existsSync(readme2) ||
    fs.existsSync(readme3)
  ) return true;
  return false;
}

module.exports = readmeCheck;
