const path = require('path');

function suffix(str) {
  if (str.substr(-1) === '/') {
    return str + 'index.html';
  }
  if (str.substr(-3).toLowerCase() === '.md') {
    return str.substr(0, str.length - 3) + '.html';
  }
  return str;
}

function compare(current, previous) {
  const currentArr = path.dirname(current).split('/');
  const previousArr = path.dirname(previous).split('/');
  let num = previousArr.length;
  for (let i = 0; i < previousArr.length; i++) {
    if (currentArr[i] === undefined) break;
    if (previousArr[i] === currentArr[i]) {
      num -= 1;
    } else {
      break;
    }
  }
  return num;
}

function makeChaptersOrigin(chapters) {
  if (!chapters) return undefined;
  const arr = [];
  chapters.forEach(i => {
    const obj = {};
    const key = Object.keys(i)[0];
    obj.origin = key;
    obj.path = suffix(key);
    obj.text = i[key];
    arr.push(obj);
  });

  // option.nextLevelBegins
  arr.forEach(i => {
    if (i.origin.substr(-1) === '/') {
      i.nextLevelBegins = true;
    } else {
      i.nextLevelBegins = false;
    }
  });

  // option.currentLevelEnds
  // option.currentLevelEndNum
  let previousDir = '.';
  let previousDepth = 1;
  let openLevel = 0;
  arr.forEach((item, index) => {
    const currentDir = path.dirname(item.path);
    if (index === 0) {
      item.currentLevelEnds = false;
      previousDir = currentDir;
      if (item.origin.substr(-1) === '/') {
        previousDepth = 2;
        openLevel = 1;
      }
      return;
    }

    if (currentDir === previousDir) {  // not change dir
      item.currentLevelEnds = false;
      if (index === arr.length - 1) {
        if (currentDir !== '.') {
          item.currentLevelEnds = true;
          item.currentLevelEndNum = openLevel;
        } else {
          item.currentLevelEnds = false;
        }
      }
    } else {  // change dir
      if (item.path.split('/').length > previousDepth) { // previous dir's next level
        item.currentLevelEnds = false;
        openLevel += 1;
      } else if (item.path.split('/').length === previousDepth) { // previous dir's same level
        item.currentLevelEnds = false;
        arr[index - 1].currentLevelEnds = true;
        arr[index - 1].currentLevelEndNum = 1;
      } else { // previous dir's top level
        item.currentLevelEnds = false;
        arr[index - 1].currentLevelEnds = true;
        arr[index - 1].currentLevelEndNum = compare(item.path, arr[index - 1].path);
        openLevel = currentDir.split('/').length;
        if (index === arr.length - 1) {
          if (currentDir !== '.') {
            item.currentLevelEnds = true;
            item.currentLevelEndNum = openLevel;
          } else {
            item.currentLevelEnds = false;
          }
        }
      }
    }
    previousDir = currentDir;
    previousDepth = item.path.split('/').length;
  });
  return arr;
}

module.exports = makeChaptersOrigin;
