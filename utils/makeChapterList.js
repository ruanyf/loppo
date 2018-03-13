function makeChapterList(root, optionObj) {
  let chapterArr = optionObj.chapters;
  if (!optionObj.chapters) {
    chapterArr = [];
  }
  let str = '<ul class="chapter-area">';
  let current_level = 0;
  chapterArr.forEach(function (c, i) {
    const chapterPathOrigin = Object.keys(c)[0];
    let chapterPath = chapterPathOrigin;
    if (chapterPath.substr(-3) === '.md') {
      chapterPath = chapterPath.substr(0, chapterPath.length - 3) + '.html';
    } else if (chapterPath.substr(-1) === '/') {
      chapterPath += 'index.html';
    }

    // embedding chapter
    const chapterPathArr = chapterPath.split('/');
    const level = chapterPathArr.length - 1;
    if (level < current_level) {
      for (let i = 0; i <= (current_level - level); i += 1) {
        str += '</ul>';
      }
    }
    if (level === current_level && chapterPathOrigin.split('/')[level] === '') {
      str += '</ul>';
    }

    let isFirstLevelDir = false;
    let isCurrentFirstLevelDir = false;
    if (level === 1 && chapterPathOrigin.split('/')[level] === '') {
      isFirstLevelDir = true;
      if (root.indexOf(Object.keys(c)[0]) === 0) {
        isCurrentFirstLevelDir = true;
      }
    }

    str += '<li class="chapter-item ' + ((chapterPathOrigin === root) ? 'chapter-item-current' : '') + '">';
    str += '<a href="'
      + optionObj.relative_root_path
      + chapterPath
      + '">'
      + c[Object.keys(c)[0]]
      + '</a>';
    if (isFirstLevelDir) {
      str += '&nbsp;<a class="first-level-collapse"><span class="icon '
        + (isCurrentFirstLevelDir ? 'icon-collapse' : 'icon-expand')
        + '" data-icon="'
        + (isCurrentFirstLevelDir ? 'collapse' : 'expand')
        + '"></span></a>';
    }
    str += '</li>';

    if (
      level > current_level ||
      (level < current_level && chapterPathOrigin.split('/')[level] === '') ||
      (level === current_level && chapterPathOrigin.split('/')[level] === '')
    ) {
      let collapseClass = '';
      if (isCurrentFirstLevelDir /* level === 1 && root.indexOf(Object.keys(c)[0]) === 0 */) {
        collapseClass = ' chapter-level-1-current';
      }
      str += '<ul class="chapter-level-' + level + collapseClass + '">';
    }
    if (level === current_level && i === (chapterArr.length - 1)) {
      for (let n = 0; n < level; n += 1) {
        str += '</ul>';
      }
    }

    current_level = level;
  });
  str += '</ul>';
  optionObj.chapterList = str;
  return optionObj;
}

module.exports = makeChapterList;
