const findRootPosition = require('./findRootPosition');

function makePreviousPageObject(root, optionObj) {
  if (root === '/') {
    optionObj.previous_page_object = null;
    return optionObj;
  }

  const position = findRootPosition(root, optionObj);
  if (position === 0) {
    if (optionObj.chapters[0]['index.md']) {
      optionObj.previous_page_object = null;
    } else {
      optionObj.previous_page_object = { 'index.md': 'Home' };
    }
    return optionObj;
  }

  if (root.substr(-8) === 'index.md') {
    optionObj.previous_page_object = optionObj.chapters[position - 2];
    return optionObj;
  }
  optionObj.previous_page_object = optionObj.chapters[position - 1];
  return optionObj;
}

module.exports = makePreviousPageObject;
