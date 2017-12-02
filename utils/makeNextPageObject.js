const findRootPosition = require('./findRootPosition');

function makeNextPageObject(root, optionObj) {
  const chapters = optionObj.chapters;

  if (!chapters || !optionObj.chapters.length) {
    optionObj.next_page_object = null;
    return optionObj;
  }

  if (root === '/') {
    if (chapters[0]['index.md']) {
      if (chapters.length === 1) {
        optionObj.next_page_object = null;
      } else {
        optionObj.next_page_object = chapters[1];
      }
    } else {
      optionObj.next_page_object = chapters[0];
    }
    return optionObj;
  }

  const position = findRootPosition(root, optionObj);
  if (position === (chapters.length - 1)) {
    optionObj.next_page_object = null;
  } else if (
    root.substr(-1) === '/' &&
    Object.keys(chapters[position + 1])[0].substr(-8) === 'index.md'
  ) {
    optionObj.next_page_object = chapters[position + 2];
  } else {
    optionObj.next_page_object = chapters[position + 1];
  }

  return optionObj;
}

module.exports = makeNextPageObject;
