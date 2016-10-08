'use strict';

const fs = require('fs-extra');
const path = require('path');
const debug = require('debug')('[' + __filename + ']');
const log = require('./utils').log;
const _ = require('lodash');
const md = require('markdown-it')();

function makeIndex(root, optionObj) {
  log.success('[BEGIN] create ' + root + 'index.html');
  // create option.content
  if (root === '') {
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
      .filter(p => p.indexOf(root) === 0)
      .filter(p => {
        const pathArr = path.relative(root, p).split(path.sep);
        if (pathArr.length > 1) return false;
        if (pathArr[0] === '') return false;
        return true;
      });
    let contentStr = '';
    chapters.forEach(p => {
      const pagePath = Object.keys(p)[0];
      let pageHtml = '';
      if (pagePath.substr(-3).toLowerCase() === '.md') {
        pageHtml = pagePath.substr(0, pagePath.length - 3) + '.html';
      } else {
        pageHtml = pagePath;
      }
      const pageName = p[pagePath];
      contentStr += '- [' + pageName + ']';
      contentStr += '(' + pageHtml + ')\n';
    });
    optionObj.content = contentStr;
  }

  // create option.page_title
  if (root !== '') {
    for (let i = 0; i < optionObj.chapters.length; i++) {
      if (optionObj.chapters[i][root]) {
        optionObj.page_title = optionObj.chapters[i][root];
        break;
      }
    }
  } else if (optionObj.content !== '') {
    const contentArr = optionObj.content.split('\n');
    const hasTitle = /^#\s*(.*)$/.exec(contentArr[0]);
    if (hasTitle) {
      optionObj.page_title = hasTitle[1];
      contentArr.shift();
      optionObj.content = contentArr.join('\n');
    }
  } else {
    optionObj.page_title = optionObj.site;
  }

  debug('finish handling Index page\'s title and content');

  // create option.previous_page
  if (root === '' || root === 'index.md') {
    optionObj.previous_page = null;
  } else if (optionObj.chapters[0][root]) {
    optionObj.previous_page = { 'index.md': 'Home' };
  } else {
    for (let i = 1; i < optionObj.chapters.length; i++) {
      if (optionObj.chapters[i][root]) {
        optionObj.previous_page = optionObj.chapters[i - 1];
        break;
      }
    }
  }

  // create option.next_page
  if (root === '' && !optionObj.chapters[0]) {
    optionObj.next_page = null;
  } else if (root === '' && optionObj.chapters[0]['index.md']) {
    if (optionObj.chapters[1]) {
      optionObj.next_page = optionObj.chapters[1];
    } else {
      optionObj.next_page = null;
    }
  } else if (root === '' && !optionObj.chapters[0]['index.md']) {
    optionObj.next_page = optionObj.chapters[0];
  } else {
    for (let i = 0; i < optionObj.chapters.length; i++) {
      if (optionObj.chapters[i][root]) {
        if (optionObj.chapters[i + 1]) {
          optionObj.next_page = optionObj.chapters[i + 1];
        } else {
          optionObj.next_page = null;
        }
        break;
      }
    }
  }

  // create option.relative_root_path
  if (root === '') {
    optionObj.relative_root_path = '.' + path.sep;
  } else {
    const pathArr = root.split(path.seq);
    optionObj.relative_root_path = _.repeat('..' + path.sep, pathArr.length - 1);
  }

  // create option.breadcrumb
  if (root === '') {
    optionObj.breadcrumb = [{ 'index.md': 'Home' }];
  } else {
    const pathArr = root.split('/');
    const breadcrumbArr = [{ 'index.md': 'Home' }];
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

  // create the page
  optionObj.content = md.render(optionObj.content);
  const pageContent = optionObj.templates.page(optionObj);
  fs.outputFileSync(path.resolve(process.cwd(), optionObj.output, root, 'index.html'), pageContent);

  log.success('[BEGIN] create ' + root + 'index.html');
}

// function makePage(pageObj, optionObj) {
// }

function page(option) {
  log.success('[BEGIN] publish pages to output directory');
  makeIndex('', option);
  log.success('[END] publish pages to output directory');
  return option;
}

module.exports = page;
