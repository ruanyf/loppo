const makeNextPageObject = require('./makeNextPageObject');

function suffix(str) {
  if (str.substr(-1) === '/') {
    return str + 'index.html';
  }
  if (str.substr(-3).toLowerCase() === '.md') {
    return str.substr(0, str.length - 3) + '.html';
  }
  return str;
}

function makeNextPageOrigin(root, optionObj) {
  if (optionObj.next_page_object === undefined) {
    optionObj = makeNextPageObject(root, optionObj);
  }

  if (optionObj.next_page_object === null) {
    optionObj.nextPageOrigin = null;
  } else {
    const obj = {};
    const key = Object.keys(optionObj.next_page_object)[0];
    obj.origin = key;
    obj.path = suffix(key);
    obj.text = optionObj.next_page_object[key];
    optionObj.nextPageOrigin = obj;
  }

  return optionObj;
}

module.exports = makeNextPageOrigin;
