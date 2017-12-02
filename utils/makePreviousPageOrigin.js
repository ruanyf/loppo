const makePreviousPageObject = require('./makePreviousPageObject');

function suffix(str) {
  if (str.substr(-1) === '/') {
    return str + 'index.html';
  }
  if (str.substr(-3).toLowerCase() === '.md') {
    return str.substr(0, str.length - 3) + '.html';
  }
  return str;
}

function makePreviousPageOrigin(root, optionObj) {
  if (optionObj.previous_page_object === undefined) {
    optionObj = makePreviousPageObject(root, optionObj);
  }

  if (optionObj.previous_page_object === null) {
    optionObj.previousPageOrigin = null;
  } else {
    const obj = {};
    const key = Object.keys(optionObj.previous_page_object)[0];
    obj.origin = key;
    obj.path = suffix(key);
    obj.text = optionObj.previous_page_object[key];
    optionObj.previousPageOrigin = obj;
  }

  return optionObj;
}

module.exports = makePreviousPageOrigin;
