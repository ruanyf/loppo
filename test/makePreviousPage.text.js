'use strict';

// const path = require('path');
const test = require('tape');
// const fs = require('fs-extra');
const makePreviousPage = require('../lib/utils').makePreviousPage;

const log = require('../lib/utils').log;
log.setLevel('error');

const test_title = '[utils.js/makePreviousPage] ';

test(
  test_title +
  'root directory',
  function (t) {
    const opt = {
      dir: 'docs',
      site: 'My Site',
      chapters: [
        { 'dir1/': 'dir1' },
        { 'dir1/a.md': 'Title A' },
        { 'dir2/': 'dir2' },
        { 'dir2/b.md': 'Title B' }
      ]
    };
    const optionObj = makePreviousPage('/', opt);
    t.equal(optionObj.previous_page, null);
    t.end();
  }
);

test(
  test_title +
  'first item is index.md',
  function (t) {
    const opt = {
      dir: 'docs',
      site: 'My Site',
      chapters: [
        { 'index.md': 'Home' },
        { 'dir1/': 'dir1' },
        { 'dir1/a.md': 'Title A' },
        { 'dir2/': 'dir2' },
        { 'dir2/b.md': 'Title B' }
      ]
    };
    const optionObj = makePreviousPage('index.md', opt);
    t.equal(optionObj.previous_page, null);
    t.end();
  }
);

test(
  test_title +
  'first item is not index.md',
  function (t) {
    const opt = {
      dir: 'docs',
      site: 'My Site',
      chapters: [
        { 'x.md': 'Title X' },
        { 'dir1/': 'dir1' },
        { 'dir1/a.md': 'Title A' },
        { 'dir2/': 'dir2' },
        { 'dir2/b.md': 'Title B' }
      ]
    };
    const optionObj = makePreviousPage('x.md', opt);
    t.deepEqual(optionObj.previous_page, { 'index.md': 'Home' });
    t.end();
  }
);

test(
  test_title +
  'not first item',
  function (t) {
    const opt = {
      dir: 'docs',
      site: 'My Site',
      chapters: [
        { 'x.md': 'Title X' },
        { 'dir1/': 'dir1' },
        { 'dir1/a.md': 'Title A' },
        { 'dir2/': 'dir2' },
        { 'dir2/b.md': 'Title B' }
      ]
    };
    const optionObj = makePreviousPage('dir1/a.md', opt);
    t.deepEqual(optionObj.previous_page, { 'dir1/': 'dir1' });
    t.end();
  }
);
