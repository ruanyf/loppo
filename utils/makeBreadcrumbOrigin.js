const findRootPosition = require('./findRootPosition');

function transform(chapterObj) {
  let key = Object.keys(chapterObj)[0];
  let value = chapterObj[key];

  if (key.substr(-3).toLowerCase() === '.md') {
    key = key.substr(0, key.length - 3) + '.html';
  }

  if (key.substr(-1) === '/') {
    key += 'index.html';
  }

  return {
    path: key,
    text: value
  };
}

function makeBreadcrumbOrigin(root, optionObj) {
  const breadcrumbArr = [transform({ 'index.md': 'Home' })];
  if (root !== '/') {
    const pathArr = root.split('/');
    let currentPath = '';
    for (let i = 0; i < pathArr.length - 1; i += 1) {
      currentPath += pathArr[i] + '/';
      for (let m = 0; m < optionObj.chapters.length; m += 1) {
        if (optionObj.chapters[m][currentPath]) {
          breadcrumbArr.push(transform(optionObj.chapters[m]));
          break;
        }
      }
    }
  }

  if (root[root.length - 1] !== '/') {
    if (root.substr(-8) === 'index.md') {
      breadcrumbArr.pop();
    }
    const position = findRootPosition(root, optionObj);
    breadcrumbArr.push(transform(optionObj.chapters[position]));
  }
  optionObj.breadcrumbOrigin = breadcrumbArr;
  return optionObj;
}

module.exports = makeBreadcrumbOrigin;
