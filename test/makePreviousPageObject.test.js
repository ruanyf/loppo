'use strict';

// const path = require('path');
const test = require('tape');
// const fs = require('fs-extra');
const makePreviousPageObject = require('../lib/utils').makePreviousPageObject;

const log = require('../lib/utils').log;
log.setLevel('error');

const test_title = '[utils.js/makePreviousPageObject] ';

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
    const optionObj = makePreviousPageObject('/', opt);
    t.equal(optionObj.previous_page_object, null);
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
    const optionObj = makePreviousPageObject('index.md', opt);
    t.equal(optionObj.previous_page_object, null);
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
    const optionObj = makePreviousPageObject('x.md', opt);
    t.deepEqual(optionObj.previous_page_object, { 'index.md': 'Home' });
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
    const optionObj = makePreviousPageObject('dir1/a.md', opt);
    t.deepEqual(optionObj.previous_page_object, { 'dir1/': 'dir1' });
    t.end();
  }
);

test(
  test_title +
  'sub level index.md',
  function (t) {
    const opt = {
      dir: 'docs',
      site: 'My Site',
      chapters: [
        { 'x.md': 'Title X' },
        { 'dir1/': 'dir1' },
        { 'dir1/index.md': 'Sub Index' },
        { 'dir1/a.md': 'Title A' },
        { 'dir2/': 'dir2' },
        { 'dir2/b.md': 'Title B' }
      ]
    };
    const optionObj = makePreviousPageObject('dir1/index.md', opt);
    t.deepEqual(optionObj.previous_page_object, { 'x.md': 'Title X' });
    t.end();
  }
);
