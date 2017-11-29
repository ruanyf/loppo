'use strict';

// const path = require('path');
const test = require('tape');
// const fs = require('fs-extra');
const makeBreadcrumbOrigin = require('../lib/utils').makeBreadcrumbOrigin;

const log = require('../lib/utils').log;
log.setLevel('error');

const test_title = '[utils.js/makeBreadcrumbOrigin] ';

test(
  test_title +
  'root directory',
  function (t) {
    const opt = {
      dir: 'docs',
      site: 'My Site',
      chapters: [
        { 'a.md': 'Title A' },
        { 'dir1/': 'dir1' },
        { 'dir1/dir2/': 'dir2' },
        { 'dir1/dir2/b.md': 'Title B' }
      ]
    };
    const optionObj = makeBreadcrumbOrigin('/', opt);
    t.deepEqual(optionObj.breadcrumbOrigin, [{ path: 'index.html', text: 'Home' }]);
    t.end();
  }
);

test(
  test_title +
  'index.md',
  function (t) {
    const opt = {
      dir: 'docs',
      site: 'My Site',
      chapters: [
        { 'index.md': 'Index' },
        { 'a.md': 'Title A' },
        { 'dir1/': 'dir1' },
        { 'dir1/dir2/': 'dir2' },
        { 'dir1/dir2/b.md': 'Title B' }
      ]
    };
    const optionObj = makeBreadcrumbOrigin('index.md', opt);
    t.deepEqual(optionObj.breadcrumbOrigin, [{ path: 'index.html', text: 'Index' }]);
    t.end();
  }
);

test(
  test_title +
  'top level path',
  function (t) {
    const opt = {
      dir: 'docs',
      site: 'My Site',
      chapters: [
        { 'index.md': 'Index' },
        { 'a.md': 'Title A' },
        { 'dir1/': 'dir1' },
        { 'dir1/dir2/': 'dir2' },
        { 'dir1/dir2/b.md': 'Title B' }
      ]
    };
    const optionObj = makeBreadcrumbOrigin('a.md', opt);
    t.deepEqual(optionObj.breadcrumbOrigin, [{ path: 'index.html', text: 'Home' }, { path: 'a.html', text: 'Title A' }]);
    t.end();
  }
);

test(
  test_title +
  'sub-directory',
  function (t) {
    const opt = {
      dir: 'docs',
      site: 'My Site',
      chapters: [
        { 'index.md': 'Index' },
        { 'a.md': 'Title A' },
        { 'dir1/': 'dir1' },
        { 'dir1/dir2/': 'dir2' },
        { 'dir1/dir2/b.md': 'Title B' }
      ]
    };
    const optionObj = makeBreadcrumbOrigin('dir1/', opt);
    t.deepEqual(optionObj.breadcrumbOrigin, [{ path: 'index.html', text: 'Home' }, { path: 'dir1/', text: 'dir1' }]);
    t.end();
  }
);

test(
  test_title +
  'sub-directory file',
  function (t) {
    const opt = {
      dir: 'docs',
      site: 'My Site',
      chapters: [
        { 'index.md': 'Index' },
        { 'a.md': 'Title A' },
        { 'dir1/': 'dir1' },
        { 'dir1/dir2/': 'dir2' },
        { 'dir1/dir2/b.md': 'Title B' }
      ]
    };
    const optionObj = makeBreadcrumbOrigin('dir1/dir2/b.md', opt);
    t.deepEqual(optionObj.breadcrumbOrigin, [
      { path: 'index.html', text: 'Home' },
      { path: 'dir1/', text: 'dir1' },
      { path: 'dir1/dir2/', text: 'dir2' },
      { path: 'dir1/dir2/b.html', text: 'Title B' }
    ]);
    t.end();
  }
);

test(
  test_title +
  'sub-directory index.md',
  function (t) {
    const opt = {
      dir: 'docs',
      site: 'My Site',
      chapters: [
        { 'index.md': 'Index' },
        { 'a.md': 'Title A' },
        { 'dir1/': 'dir1' },
        { 'dir1/dir2/': 'dir2' },
        { 'dir1/dir2/index.md': 'Sub Index' }
      ]
    };
    const optionObj = makeBreadcrumbOrigin('dir1/dir2/index.md', opt);
    t.deepEqual(optionObj.breadcrumbOrigin, [
      { path: 'index.html', text: 'Home' },
      { path: 'dir1/', text: 'dir1' },
      { path: 'dir1/dir2/index.html', text: 'Sub Index' }
    ]);
    t.end();
  }
);
