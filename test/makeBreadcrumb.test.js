'use strict';

// const path = require('path');
const test = require('tape');
// const fs = require('fs-extra');
const makeBreadcrumb = require('../lib/utils').makeBreadcrumb;

const log = require('../lib/utils').log;
log.setLevel('error');

const test_title = '[utils.js/makeBreadcrumb] ';

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
    const optionObj = makeBreadcrumb('/', opt);
    t.deepEqual(optionObj.breadcrumb, [{ 'index.md': 'Home' }]);
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
    const optionObj = makeBreadcrumb('index.md', opt);
    t.deepEqual(optionObj.breadcrumb, [{ 'index.md': 'Index' }]);
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
    const optionObj = makeBreadcrumb('a.md', opt);
    t.deepEqual(optionObj.breadcrumb, [{ 'index.md': 'Home' }, { 'a.md': 'Title A' }]);
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
    const optionObj = makeBreadcrumb('dir1/', opt);
    t.deepEqual(optionObj.breadcrumb, [{ 'index.md': 'Home' }, { 'dir1/': 'dir1' }]);
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
    const optionObj = makeBreadcrumb('dir1/dir2/b.md', opt);
    t.deepEqual(optionObj.breadcrumb, [
      { 'index.md': 'Home' },
      { 'dir1/': 'dir1' },
      { 'dir1/dir2/': 'dir2' },
      { 'dir1/dir2/b.md': 'Title B' }
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
    const optionObj = makeBreadcrumb('dir1/dir2/index.md', opt);
    t.deepEqual(optionObj.breadcrumb, [
      { 'index.md': 'Home' },
      { 'dir1/': 'dir1' },
      { 'dir1/dir2/index.md': 'Sub Index' }
    ]);
    t.end();
  }
);
