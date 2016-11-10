'use strict';

// const path = require('path');
const test = require('tape');
// const fs = require('fs-extra');
const makeRelativeRootPath = require('../lib/utils').makeRelativeRootPath;

const log = require('../lib/utils').log;
log.setLevel('error');

const test_title = '[utils.js/makeRootRelativePath] ';

test(
  test_title +
  'root directory',
  function (t) {
    const opt = {
      dir: 'docs',
      site: 'My Site',
      chapters: []
    };
    const optionObj = makeRelativeRootPath('/', opt);
    t.equal(optionObj.relative_root_path, './');
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
        { 'a.md': 'Title A' }
      ]
    };
    const optionObj = makeRelativeRootPath('a.md', opt);
    t.equal(optionObj.relative_root_path, '');
    t.end();
  }
);

test(
  test_title +
  'sub level path',
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
    const optionObj = makeRelativeRootPath('dir1/', opt);
    t.equal(optionObj.relative_root_path, '../');
    t.end();
  }
);

test(
  test_title +
  'sub level path',
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
    const optionObj = makeRelativeRootPath('dir1/dir2/b.md', opt);
    t.equal(optionObj.relative_root_path, '../../');
    t.end();
  }
);

