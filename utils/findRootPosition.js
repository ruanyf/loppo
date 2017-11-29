function findRootPosition(root, optionObj) {
  for (let i = 0; i < optionObj.chapters.length; i += 1) {
    if (optionObj.chapters[i][root]) {
      return i;
    }
  }
  throw new Error('Cannot find the path in Chapters!');
}

module.exports = findRootPosition;
