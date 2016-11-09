'use strict';

const path = require('path');
const fs = require('fs-extra');
const debug = require('debug')('[' + __filename + ']');
const _ = require('lodash');
const markdownIt = require('markdown-it');
const markdownItTocAndAnchor = require('markdown-it-toc-and-anchor').default;


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
  log.setLevel.call(log, arguments[0]);
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
  if (root[root.length - 1] !== path.sep) {
    const filePath = path.resolve(process.cwd(), optionObj.dir, root);
    optionObj.content = fs.readFileSync(filePath, 'utf8');
    return optionObj;
  }

  // if a directory
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
  } else {
    const chapters = optionObj.chapters
      .filter(p => Object.keys(p)[0].indexOf(root) === 0)
      .filter(p => {
        const pathArr = path.relative(root, Object.keys(p)[0]).split(path.sep);
        if (pathArr.length > 1) return false;
        if (pathArr[0] === '') return false;
        return true;
      });
    let contentStr = '';
    chapters.forEach(p => {
      const pagePath = Object.keys(p)[0];
      const relativePath = path.relative(root, pagePath);
      let pageHtml = '';
      if (relativePath.substr(-3).toLowerCase() === '.md') {
        pageHtml = relativePath.substr(0, relativePath.length - 3) + '.html';
      } else {
        pageHtml = relativePath + path.sep;
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
  for (let i = 0; i < optionObj.chapters.length; i++) {
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
  // if regular file
  if (root.substr(-3).toLowerCase() === '.md') {
    if (optionObj.content) {
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
    } else {
      const position = findRootPosition(root, optionObj);
      optionObj.page_title = optionObj.chapters[position][root];
    }
    return optionObj;
  }

  // if sub-directory
  if (root[root.length - 1] === path.sep && root !== '/') {
    const rootPosition = findRootPosition(root, optionObj);
    optionObj.page_title = optionObj.chapters[rootPosition][root];
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
 * makePreviousPage()
 */
function makePreviousPage(root, optionObj) {
  if (root === '/') {
    optionObj.previous_page = null;
    return optionObj;
  }

  const position = findRootPosition(root, optionObj);
  if (position === 0) {
    if (optionObj.chapters[0]['index.md']) {
      optionObj.previous_page = null;
    } else {
      optionObj.previous_page = { 'index.md': 'Home' };
    }
    return optionObj;
  }

  optionObj.previous_page = optionObj.chapters[position - 1];
  return optionObj;
}

exports.makePreviousPage = makePreviousPage;


/*
 * makeNextPage()
 */
function makeNextPage(root, optionObj) {
  const chapters = optionObj.chapters;

  if (!chapters || !optionObj.chapters.length) {
    optionObj.next_page = null;
    return optionObj;
  }

  if (root === '/') {
    if (chapters[0]['index.md']) {
      if (chapters.length === 1) {
        optionObj.next_page = null;
      } else {
        optionObj.next_page = chapters[1];
      }
    } else {
      optionObj.next_page = chapters[0];
    }
    return optionObj;
  }

  const position = findRootPosition(root, optionObj);
  if (position === (chapters.length - 1)) {
    optionObj.next_page = null;
  } else {
    optionObj.next_page = chapters[position + 1];
  }

  return optionObj;
}

exports.makeNextPage = makeNextPage;


/*
 * makeIndex()
 */
function makeIndex(root, optionObj) {
  logWithIcon.success('[BEGIN] create ' + root + 'index.html');

  // create option.content
  optionObj = makeContent(root, optionObj);
  debug('get page content: ', optionObj.content);

  // create option.page_title
  optionObj = makePageTitle(root, optionObj);
  debug('get page title: ', optionObj.page_title);

  // create option.previous_page
  optionObj = makePreviousPage(root, optionObj);
  debug('get previous page: ', optionObj.previous_page);

  // create option.next_page
  optionObj = makeNextPage(root, optionObj);
  debug('get next page: ', optionObj.next_page);

  // create option.relative_root_path
  if (root === '/') {
    optionObj.relative_root_path = '.' + path.sep;
  } else {
    const pathArr = root.split(path.seq);
    optionObj.relative_root_path = _.repeat('..' + path.sep, pathArr.length - 1);
  }

  // create option.breadcrumb
  const breadcrumbArr = [{ 'index.md': 'Home' }];
  if (root !== '/') {
    const pathArr = root.split('/');
    let currentPath = '';
    for (let i = 0; i < pathArr.length - 1; i++) {
      currentPath += pathArr[i] + path.sep;
      for (let m = 0; m < optionObj.chapters; m++) {
        if (optionObj.chapters[m][currentPath]) {
          breadcrumbArr.push(optionObj.chapters[m]);
          break;
        }
      }
    }
  }
  optionObj.breadcrumb = breadcrumbArr;

  // create the page and option.toc
  optionObj.toc = '';
  optionObj.content = markdownIt({
    html: true,
    linkify: true,
    typography: true,
  }).use(markdownItTocAndAnchor, {
    tocFirstLevel: 2,
    tocLastLevel: 3,
    tocCallback: (tocMarkdown, tocArray, tocHtml) => {
      optionObj.toc = tocHtml;
    }
  }).render(optionObj.content);

  const pageContent = optionObj.templates.page(optionObj);
  fs.outputFileSync(
    path.resolve(
      process.cwd(),
      optionObj.output,
      root === '/' ? '.' + path.sep : root,
      'index.html'
    ),
    pageContent
  );
  logWithIcon.success('[BEGIN] create ' + root + 'index.html');
}

exports.makeIndex = makeIndex;

