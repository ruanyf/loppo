'use strict';

const path = require('path');
const test = require('tape');
const makeContent = require('../lib/utils').makeContent;

const log = require('../lib/utils').log;
log.setLevel('error');

const test_title = '[utils.js/makeContent] ';

test(
  test_title +
  'regular markdown file',
  function (t) {
    const TEST_PATH = path.resolve(__dirname, './fixture/makeContent/regular-markdown-file');
    process.chdir(TEST_PATH);
    let opt = {
      dir: 'docs',
      chapters: [
        { 'first.md': 'First' },
        { 'dir1/': 'dir1' },
        { 'dir1/a.md': 'Title A' },
        { 'dir2/': 'dir2' },
        { 'dir2/b.md': 'Title B' }
      ]
    };
    opt = makeContent('first.md', opt);
    let result = '';
    if (path.sep !== '/') {
      result = 'This is a regular file.\r\n';
    } else {
      result = 'This is a regular file.\n';
    }
    t.equal(opt.content, result);
    t.end();
  }
);

test(
  test_title +
  'root index with README',
  function (t) {
    const TEST_PATH = path.resolve(__dirname, './fixture/makeContent/root-index-with-readme');
    process.chdir(TEST_PATH);
    let opt = {
      dir: 'docs',
      chapters: [
        { 'dir1/': 'dir1' },
        { 'dir1/a.md': 'Title A' },
        { 'dir2/': 'dir2' },
        { 'dir2/b.md': 'Title B' }
      ]
    };
    opt = makeContent('/', opt);
    let result = '';
    if (path.sep !== '/') {
      result = 'This is a README file.\r\n';
    } else {
      result = 'This is a README file.\n';
    }
    t.equal(opt.content, result);
    t.end();
  }
);

test(
  test_title +
  'root index without README',
  function (t) {
    const TEST_PATH = path.resolve(__dirname, './fixture/makeContent/root-index-without-readme');
    process.chdir(TEST_PATH);
    let opt = {
      dir: 'docs',
      chapters: [
        { 'dir1/': 'dir1' },
        { 'dir1/a.md': 'Title A' },
        { 'dir2/': 'dir2' },
        { 'dir2/b.md': 'Title B' }
      ]
    };
    opt = makeContent('/', opt);
    t.equal(opt.content, '');
    t.end();
  }
);

test(
  test_title +
  'non root index with md files',
  function (t) {
    const TEST_PATH = path.resolve(__dirname, './fixture/makeContent/non-root-index-with-md-files');
    process.chdir(TEST_PATH);
    let opt = {
      dir: 'docs',
      chapters: [
        { 'dir1/': 'dir1' },
        { 'dir1/a.md': 'Title A' },
        { 'dir1/b.md': 'Title B' }
      ]
    };
    opt = makeContent('dir1/', opt);
    t.equal(opt.content, '- [Title A](a.html)\n- [Title B](b.html)\n');
    t.end();
  }
);

test(
  test_title +
  'non root index with md files and sub-directories',
  function (t) {
    let opt = {
      dir: 'docs',
      chapters: [
        { 'dir1/': 'dir1' },
        { 'dir1/a.md': 'Title A' },
        { 'dir1/b.md': 'Title B' },
        { 'dir1/dir2/': 'dir2' },
        { 'dir1/dir2/c.md': 'Title C' },
        { 'dir1/dir2/dir3/': 'dir3' },
        { 'dir1/dir2/dir3/d.md': 'Title D' }
      ]
    };
    opt = makeContent('dir1/', opt);
    t.equal(opt.content, '- [Title A](a.html)\n- [Title B](b.html)\n- [dir2](dir2/)\n');
    t.end();
  }
);
