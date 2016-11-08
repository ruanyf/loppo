'use strict';

// const path = require('path');
const test = require('tape');
// const fs = require('fs-extra');
const makePageTitle = require('../lib/utils').makePageTitle;

const log = require('../lib/utils').log;
log.setLevel('error');

const test_title = '[utils.js/makePageTitle] ';

test(
  test_title +
  'regular file\'s content has page title',
  function (t) {
    const opt = {
      dir: 'docs',
      site: 'My Site',
      chapters: [
        { 'dir1/': 'dir1' },
        { 'dir1/a.md': 'Title A' },
        { 'dir2/': 'dir2' },
        { 'dir2/b.md': 'Title B' }
      ],
      content: '# My Title\n\nThis is an example.\n'
    };
    const optionObj = makePageTitle('dir1/a.md', opt);
    t.equal(optionObj.page_title, 'My Title');
    t.equal(optionObj.content, '\nThis is an example.\n');
    t.end();
  }
);

test(
  test_title +
  'regular file\'s content has no page title',
  function (t) {
    const opt = {
      dir: 'docs',
      site: 'My Site',
      chapters: [
        { 'dir1/': 'dir1' },
        { 'dir1/a.md': 'Title A' },
        { 'dir2/': 'dir2' },
        { 'dir2/b.md': 'Title B' }
      ],
      content: 'This is an example.\n'
    };
    const optionObj = makePageTitle('dir1/a.md', opt);
    t.equal(optionObj.page_title, 'Title A');
    t.equal(optionObj.content, 'This is an example.\n');
    t.end();
  }
);

test(
  test_title +
  'regular file content has no content',
  function (t) {
    const opt = {
      dir: 'docs',
      site: 'My Site',
      chapters: [
        { 'dir1/': 'dir1' },
        { 'dir1/a.md': 'Title A' },
        { 'dir2/': 'dir2' },
        { 'dir2/b.md': 'Title B' }
      ],
      content: ''
    };
    const optionObj = makePageTitle('dir1/a.md', opt);
    t.equal(optionObj.page_title, 'Title A');
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
        { 'dir1/': 'dir1' },
        { 'dir1/a.md': 'Title A' },
        { 'dir2/': 'dir2' },
        { 'dir2/b.md': 'Title B' }
      ],
      content: ''
    };
    const optionObj = makePageTitle('dir1/', opt);
    t.equal(optionObj.page_title, 'dir1');
    t.end();
  }
);

test(
  test_title +
  'root directory has no content',
  function (t) {
    const opt = {
      dir: 'docs',
      site: 'My Site',
      chapters: [
        { 'dir1/': 'dir1' },
        { 'dir1/a.md': 'Title A' },
        { 'dir2/': 'dir2' },
        { 'dir2/b.md': 'Title B' }
      ],
      content: ''
    };
    const optionObj = makePageTitle('/', opt);
    t.equal(optionObj.page_title, 'My Site');
    t.end();
  }
);

test(
  test_title +
  'root directory has content and page title',
  function (t) {
    const opt = {
      dir: 'docs',
      site: 'My Site',
      chapters: [
        { 'dir1/': 'dir1' },
        { 'dir1/a.md': 'Title A' },
        { 'dir2/': 'dir2' },
        { 'dir2/b.md': 'Title B' }
      ],
      content: '# Readme\n\nThis is an example.\n'
    };
    const optionObj = makePageTitle('/', opt);
    t.equal(optionObj.page_title, 'Readme');
    t.equal(optionObj.content, '\nThis is an example.\n');
    t.end();
  }
);

test(
  test_title +
  'root directory has content and no page title',
  function (t) {
    const opt = {
      dir: 'docs',
      site: 'My Site',
      chapters: [
        { 'dir1/': 'dir1' },
        { 'dir1/a.md': 'Title A' },
        { 'dir2/': 'dir2' },
        { 'dir2/b.md': 'Title B' }
      ],
      content: 'This is an example.\n'
    };
    const optionObj = makePageTitle('/', opt);
    t.equal(optionObj.page_title, 'My Site');
    t.equal(optionObj.content, 'This is an example.\n');
    t.end();
  }
);
