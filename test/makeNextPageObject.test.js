'use strict';

// const path = require('path');
const test = require('tape');
// const fs = require('fs-extra');
const makeNextPageObject = require('../lib/utils').makeNextPageObject;

const log = require('../lib/utils').log;
log.setLevel('error');

const test_title = '[utils.js/makeNextPageObject] ';

test(
  test_title +
  'root directory and no other content',
  function (t) {
    const opt = {
      dir: 'docs',
      site: 'My Site',
      chapters: []
    };
    const optionObj = makeNextPageObject('/', opt);
    t.equal(optionObj.next_page_object, null);
    t.end();
  }
);

test(
  test_title +
  'root directory and the only item is index.md',
  function (t) {
    const opt = {
      dir: 'docs',
      site: 'My Site',
      chapters: [
        { 'index.md': 'Title Index' }
      ]
    };
    const optionObj = makeNextPageObject('/', opt);
    t.equal(optionObj.next_page_object, null);
    t.end();
  }
);

test(
  test_title +
  'root directory and chapters.yml\'s first item is not index.md',
  function (t) {
    const opt = {
      dir: 'docs',
      site: 'My Site',
      chapters: [
        { 'a.md': 'Title A' }
      ]
    };
    const optionObj = makeNextPageObject('/', opt);
    t.deepEqual(optionObj.next_page_object, { 'a.md': 'Title A' });
    t.end();
  }
);

test(
  test_title +
  'index.md and it is the only item',
  function (t) {
    const opt = {
      dir: 'docs',
      site: 'My Site',
      chapters: [
        { 'index.md': 'Title Index' }
      ]
    };
    const optionObj = makeNextPageObject('index.md', opt);
    t.equal(optionObj.next_page_object, null);
    t.end();
  }
);

test(
  test_title +
  'index.md and it is not the only item',
  function (t) {
    const opt = {
      dir: 'docs',
      site: 'My Site',
      chapters: [
        { 'index.md': 'Title Index' },
        { 'a.md': 'Title A' }
      ]
    };
    const optionObj = makeNextPageObject('index.md', opt);
    t.deepEqual(optionObj.next_page_object, { 'a.md': 'Title A' });
    t.end();
  }
);

test(
  test_title +
  'regular item and it is the last item',
  function (t) {
    const opt = {
      dir: 'docs',
      site: 'My Site',
      chapters: [
        { 'a.md': 'Title A' },
        { 'b.md': 'Title B' }
      ]
    };
    const optionObj = makeNextPageObject('a.md', opt);
    t.deepEqual(optionObj.next_page_object, { 'b.md': 'Title B' });
    t.end();
  }
);

test(
  test_title +
  'regular item and it is not the last item',
  function (t) {
    const opt = {
      dir: 'docs',
      site: 'My Site',
      chapters: [
        { 'a.md': 'Title A' },
        { 'b.md': 'Title B' }
      ]
    };
    const optionObj = makeNextPageObject('b.md', opt);
    t.deepEqual(optionObj.next_page_object, null);
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
        { 'a.md': 'Title A' },
        { 'dir1/': 'dir1' },
        { 'dir1/index.md': 'Sub Index' },
        { 'dir1/b.md': 'Title B' }
      ]
    };
    const optionObj = makeNextPageObject('dir1/', opt);
    t.deepEqual(optionObj.next_page_object, { 'dir1/b.md': 'Title B' });
    t.end();
  }
);
