'use strict';

const path = require('path');
const fs = require('fs-extra');
const debug = require('debug')('[' + __filename + ']');
const _ = require('lodash');
const md = require('turpan');

/*
 * log()
 */
const log4js = require('log4js');
log4js.configure(path.resolve(__dirname, './log4js.config.json'));
const logSymbols = require('log-symbols');
const log = log4js.getLogger('loppo');
const logWithIcon = {};

function noop() {}

logWithIcon.info = function info() {
  process.stdout.write(logSymbols.info + ' ');
  log.info.apply(log, arguments);
};

logWithIcon.success = function success() {
  process.stdout.write(logSymbols.success + ' ');
  log.info.apply(log, arguments);
};

logWithIcon.warn = function warn() {
  process.stdout.write(logSymbols.warning + ' ');
  log.warn.apply(log, arguments);
};

logWithIcon.error = function error() {
  process.stdout.write(logSymbols.error + ' ');
  log.error.apply(log, arguments);
};

logWithIcon.fatal = function fatal() {
  process.stdout.write(logSymbols.error + ' ');
  log.fatal.apply(log, arguments);
};

logWithIcon.setLevel = function setLevel() {
  // log.setLevel.call(log, arguments[0]);
  log.level = arguments[0];
  if (arguments[0].toLowerCase() === 'warn') {
    logWithIcon.info = noop;
    logWithIcon.success = noop;
  }
  if (arguments[0].toLowerCase() === 'error') {
    logWithIcon.info = noop;
    logWithIcon.success = noop;
    logWithIcon.warn = noop;
  }
  if (arguments[0].toLowerCase() === 'fatal') {
    logWithIcon.info = noop;
    logWithIcon.success = noop;
    logWithIcon.warn = noop;
    logWithIcon.fatal = noop;
  }
};

exports.log = logWithIcon;


/*
 * makeContent()
 */

function makeContent(root, optionObj) {
  // if a regular markdown file
  if (root[root.length - 1] !== '/') {
    const filePath = path.resolve(process.cwd(), optionObj.dir, root);
    optionObj.content = fs.readFileSync(filePath, 'utf8');
    return optionObj;
  }

  // if root directory
  if (root === '/') {
    // check if readme.md exists
    const readme1 = path.resolve(process.cwd(), 'readme.md');
    const readme2 = path.resolve(process.cwd(), 'README.MD');
    const readme3 = path.resolve(process.cwd(), 'README.md');
    if (fs.existsSync(readme1)) {
      optionObj.content = fs.readFileSync(readme1, 'utf8');
    } else if (fs.existsSync(readme2)) {
      optionObj.content = fs.readFileSync(readme2, 'utf8');
    } else if (fs.existsSync(readme3)) {
      optionObj.content = fs.readFileSync(readme3, 'utf8');
    } else {
      optionObj.content = '';
    }

    // modify images position
    const reg = new RegExp('\\(' + optionObj.dir + '\\/images\\/', 'g');
    optionObj.content = optionObj.content.replace(reg, '(images/');

  // if sub directory with index.md
  } else if (fs.existsSync(path.resolve(process.cwd(), optionObj.dir, root, 'index.md'))) {
    optionObj.content = fs.readFileSync(
      path.posix.resolve(process.cwd(), optionObj.dir, root, 'index.md'),
      'utf8'
    );
  // if sub directory without index.md
  } else {
    const chapters = optionObj.chapters
      .filter(p => Object.keys(p)[0].indexOf(root) === 0)
      .filter((p) => {
        const pathArr = path.posix.relative(root, Object.keys(p)[0]).split('/');
        if (pathArr.length > 1) return false;
        if (pathArr[0] === '') return false;
        return true;
      });
    let contentStr = '';
    chapters.forEach((p) => {
      const pagePath = Object.keys(p)[0];
      const relativePath = path.posix.relative(root, pagePath);
      let pageHtml = '';
      if (relativePath.substr(-3).toLowerCase() === '.md') {
        pageHtml = relativePath.substr(0, relativePath.length - 3) + '.html';
      } else {
        pageHtml = relativePath + '/';
      }
      const pageName = p[pagePath];
      contentStr += '- [' + pageName + ']';
      contentStr += '(' + pageHtml + ')\n';
    });
    optionObj.content = contentStr;
  }
  return optionObj;
}

exports.makeContent = makeContent;

/*
 *  findRootPosition()
 */
function findRootPosition(root, optionObj) {
  for (let i = 0; i < optionObj.chapters.length; i += 1) {
    if (optionObj.chapters[i][root]) {
      return i;
    }
  }
  throw new Error('Cannot find the path in Chapters!');
}


/*
 *  makePageTitle()
 */
function makePageTitle(root, optionObj) {
  if (root.substr(-3).toLowerCase() === '.md') {
    if (optionObj.content) {
      const contentArr = optionObj.content.split('\n');
      const hasTitle = /^#\s*(.*)\s*$/.exec(contentArr[0]);
      if (hasTitle) {
        optionObj.page_title = hasTitle[1];
        contentArr.shift();
        optionObj.content = contentArr.join('\n');
      } else {
        const position = findRootPosition(root, optionObj);
        optionObj.page_title = optionObj.chapters[position][root];
      }
    } else {
      const position = findRootPosition(root, optionObj);
      optionObj.page_title = optionObj.chapters[position][root];
    }
    return optionObj;
  }

  // if sub-directory
  if (root[root.length - 1] === '/' && root !== '/') {
    const contentArr = optionObj.content.split('\n');
    const hasTitle = /^#\s*(.*)$/.exec(contentArr[0]);
    if (hasTitle) {
      optionObj.page_title = hasTitle[1];
      contentArr.shift();
      optionObj.content = contentArr.join('\n');
    } else {
      const position = findRootPosition(root, optionObj);
      optionObj.page_title = optionObj.chapters[position][root];
    }
    return optionObj;
  }

  // if root directory
  if (root === '/') {
    if (optionObj.content !== '') {
      const contentArr = optionObj.content.split('\n');
      const hasTitle = /^#\s*(.*)$/.exec(contentArr[0]);
      if (hasTitle) {
        optionObj.page_title = hasTitle[1];
        contentArr.shift();
        optionObj.content = contentArr.join('\n');
      } else {
        optionObj.page_title = optionObj.site;
      }
    } else {
      optionObj.page_title = optionObj.site;
    }
    return optionObj;
  }

  optionObj.page_title = optionObj.site;
  return optionObj;
}

exports.makePageTitle = makePageTitle;


/*
 * makePreviousPageObject()
 */
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

exports.makePreviousPageObject = makePreviousPageObject;


/*
 * makeNextPageObject()
 */
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

exports.makeNextPageObject = makeNextPageObject;


/*
 * makeRelativeRootPath()
 */
function makeRelativeRootPath(root, optionObj) {
  if (root === '/') {
    optionObj.relative_root_path = './';
  } else {
    const pathArr = root.split('/');
    optionObj.relative_root_path = _.repeat('../', pathArr.length - 1);
  }
  return optionObj;
}

exports.makeRelativeRootPath = makeRelativeRootPath;


/*
 * makePreviousPage()
 */
function makePreviousPage(root, optionObj) {
  const pp = optionObj.previous_page_object;
  if (pp === null) {
    // optionObj.previous_page = '';
    optionObj.previous_page = '<a title="previous page" class="previouse-article-link link-disabled">'
      + '<span class="icon icon-previous-disabled" data-icon="previous-disabled"></span>'
      + '</a>';
  } else {
    let pp_path = Object.keys(pp)[0];
    if (pp_path.substr(-1) === '/') {
      pp_path += 'index.html';
    } else if (pp_path.substr(-3) === '.md') {
      pp_path = pp_path.substr(0, pp_path.length - 3) + '.html';
    }
    optionObj.previous_page = '<a title="previous page" class="previouse-article-link" href="'
      + optionObj.relative_root_path
      + pp_path
      + '">'
      + '<span class="icon icon-previous" data-icon="previous"></span>'
      + '<span class="link-content">&laquo; Previous</span></a>';
  }
  return optionObj;
}

exports.makePreviousPage = makePreviousPage;


/*
 * makeNextPage()
 */
function makeNextPage(root, optionObj) {
  const np = optionObj.next_page_object;
  if (np === null) {
    // optionObj.next_page = '';
    optionObj.next_page = '<a title="next page" class="next-article-link link-disabled">'
      + '<span class="icon icon-next-disabled" data-icon="next-disabled"></span>'
      + '</a>';
  } else {
    let np_path = Object.keys(np)[0];
    if (np_path.substr(-1) === '/') {
      np_path += 'index.html';
    } else if (np_path.substr(-3) === '.md') {
      np_path = np_path.substr(0, np_path.length - 3) + '.html';
    }
    optionObj.next_page = '<a title="next page" class="next-article-link" href="'
      + optionObj.relative_root_path
      + np_path
      + '">'
      + '<span class="icon icon-next" data-icon="next"></span>'
      + '<span class="link-content">Next &raquo;</span>'
      + '</a>';
  }
  return optionObj;
}

exports.makeNextPage = makeNextPage;


/*
 * makeBuildTime()
 */
function makeBuildTime(root, optionObj) {
  optionObj.build_time = new Date();
  return optionObj;
}

exports.makeBuildTime = makeBuildTime;


/*
 * makeBreadcrumbOrigin()
 */
function makeBreadcrumbOrigin(root, optionObj) {
  const breadcrumbArr = [{ 'index.md': 'Home' }];
  if (root !== '/') {
    const pathArr = root.split('/');
    let currentPath = '';
    for (let i = 0; i < pathArr.length - 1; i += 1) {
      currentPath += pathArr[i] + '/';
      for (let m = 0; m < optionObj.chapters.length; m += 1) {
        if (optionObj.chapters[m][currentPath]) {
          breadcrumbArr.push(optionObj.chapters[m]);
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
    breadcrumbArr.push(optionObj.chapters[position]);
  }
  optionObj.breadcrumbOrigin = breadcrumbArr;
  return optionObj;
}

exports.makeBreadcrumbOrigin = makeBreadcrumbOrigin;


/*
 * makeBreadcrumb()
 */

function makeBreadcrumb(root, optionObj) {
  const bcHTMLArr = [];
  optionObj.breadcrumbOrigin.forEach(function (c) {
    let bcPath = Object.keys(c)[0];
    if (bcPath.substr(-3) === '.md') {
      bcPath = bcPath.substr(0, bcPath.length - 3) + '.html';
    } else if (bcPath.substr(-1) === '/') {
      bcPath += 'index.html';
    }
    const str = '<a href="'
      + optionObj.relative_root_path
      + bcPath
      + '" class="breadcrumb-item">'
      + c[Object.keys(c)[0]]
      + '</a>';
    bcHTMLArr.push(str);
  });
  let bcHTML = '<div class="breadcrumb-area">';
  bcHTML += bcHTMLArr.join('<span class="breadcrumb-delimiter"> &gt; </span>');
  bcHTML += '</div>';
  optionObj.breadcrumb = bcHTML;
  return optionObj;
}

exports.makeBreadcrumb = makeBreadcrumb;


/*
 * makeChapterList
 */
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
      for (let i = 0; i < (current_level - level); i += 1) {
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
      level > current_level
      || (level === current_level && chapterPathOrigin.split('/')[level] === '')
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

exports.makeChapterList = makeChapterList;


/*
 * makeMarkdown()
 */
function markdownRender(root, optionObj) {
  md.set({
    tocCallback(tocMarkdown, tocArray, tocHtml) {
      optionObj.toc = tocHtml;
    }
  });

  optionObj.content = md.render(optionObj.content);
  return optionObj;
}

exports.markdownRender = markdownRender;


/*
 * writePage()
 */
function writePage(root, optionObj) {
  const pageContent = optionObj.templates.page(optionObj);
  let relativePath = root;
  if (relativePath === '/') {
    relativePath = './';
  }
  if (relativePath[relativePath.length - 1] === '/') {
    relativePath += 'index.html';
  } else {
    relativePath = relativePath.substr(0, relativePath.length - 3) + '.html';
  }
  fs.outputFileSync(
    path.resolve(
      process.cwd(),
      optionObj.output,
      relativePath
    ),
    pageContent
  );
}

exports.writePage = writePage;

/*
 * makePage()
 */
function makePage(root, optionObj) {
  logWithIcon.success('[BEGIN] create ' + root + ' page');

  // create option.current_path
  optionObj.current_path = root;
  debug('get current_path: ', optionObj.current_path);

  // create option.content
  optionObj = makeContent(root, optionObj);
  debug('get page content: ', optionObj.content);

  // create option.page_title
  optionObj = makePageTitle(root, optionObj);
  debug('get page title: ', optionObj.page_title);

  // create option.previous_page_object
  optionObj = makePreviousPageObject(root, optionObj);
  debug('get previous page object: ', optionObj.previous_page_object);

  // create option.next_page_object
  optionObj = makeNextPageObject(root, optionObj);
  debug('get next page object: ', optionObj.next_page_object);

  // create option.relative_root_path
  optionObj = makeRelativeRootPath(root, optionObj);
  debug('get relative root path: ', optionObj.relative_root_path);

  // create option.previous_page
  optionObj = makePreviousPage(root, optionObj);
  debug('get previous page: ', optionObj.previous_page);

  // create option.next_page
  optionObj = makeNextPage(root, optionObj);
  debug('get next page: ', optionObj.next_page);

  // create option.build_time
  optionObj = makeBuildTime(root, optionObj);
  debug('get build time: ', optionObj.build_time);

  // create option.breadcrumbOrigin
  optionObj = makeBreadcrumbOrigin(root, optionObj);
  debug('get breadcrumbOrigin: ', optionObj.breadcrumbOrigin);

  // create option.breadcrumb
  optionObj = makeBreadcrumb(root, optionObj);
  debug('get breadcrumb: ', optionObj.breadcrumb);

  // create option.chapterList
  optionObj = makeChapterList(root, optionObj);
  debug('get chapterList: ', optionObj.chapterList);

  // create option.toc and option.content in HTML
  optionObj = markdownRender(root, optionObj);
  debug('get option.toc: ', optionObj.toc);
  debug('get option.content in HTML: ', optionObj.content);

  // write to page
  writePage(root, optionObj);

  logWithIcon.success('[END] create ' + root + ' page');
}

exports.makePage = makePage;

