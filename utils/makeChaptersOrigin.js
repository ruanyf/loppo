function suffix(str) {
  if (str.substr(-1) === '/') {
    return str + 'index.html';
  }
  if (str.substr(-3).toLowerCase() === '.md') {
    return str.substr(0, str.length - 3) + '.html';
  }
  return str;
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
  return arr;
}

module.exports = makeChaptersOrigin;
