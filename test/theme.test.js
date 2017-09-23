'use strict';

const path = require('path');
const test = require('tape');
const fs = require('fs-extra');
const theme = require('../lib/theme');
// const walkSync = require('walk-sync');

const log = require('../lib/utils').log;
log.setLevel('error');

const test_title = '[theme.js] ';
const THEME = 'oceandeep';
const THEMEDIR = 'loppo-theme';

test(
  test_title +
  'if the theme directory already exists, the directory will have no changes',
  function (t) {
    const TEST_PATH = path.resolve(__dirname, './fixture/theme/theme-exists');
    process.chdir(TEST_PATH);
    const option = theme({ theme: THEME });
    // const result = walkSync(path.resolve(process.cwd(), 'themes', THEME));
    let result = '';
    if (path.sep !== '/') {
      result = 'hello world\r\n';
    } else {
      result = 'hello world\n';
    }
    t.equal(option.templates.page(), result);
    t.end();
  }
);

test(
  test_title +
  'if the theme directory does not exist, the directory will be created',
  function (t) {
    const TEST_PATH = path.resolve(__dirname, './fixture/theme/theme-not-exists');
    process.chdir(TEST_PATH);
    const option = theme({ theme: THEME });
    // const result = walkSync(path.resolve(process.cwd(), 'themes', THEME));

    t.equal(typeof option.templates.page, 'function');
    t.end();
    fs.removeSync(path.resolve(process.cwd(), 'themes', THEME));
  }
);

test(
  test_title +
  '<% includes %> syntax',
  function (t) {
    const TEST_PATH = path.resolve(__dirname, './fixture/theme/includes');
    process.chdir(TEST_PATH);
    const option = theme({ theme: THEME });
    // const result = walkSync(path.resolve(process.cwd(), 'themes', THEME));
    let result = '';
    if (path.sep !== '/') {
      result = '<h1>Hello</h1>\r\n World\r\n\r\nnew\r\n2016\r\n\r\n';
    } else {
      result = '<h1>Hello</h1>\n World\n\nnew\n2016\n\n';
    }
    t.equal(option.templates.page(), result);
    t.end();
    // fs.removeSync(path.resolve(process.cwd(), 'themes', THEME));
  }
);

test(
  test_title +
  'customization is true and theme dir is existed',
  function (t) {
    const TEST_PATH = path.resolve(__dirname, './fixture/theme/customization-true-themedir-exists');
    process.chdir(TEST_PATH);
    const option = theme({ customization: true });
    let result = '';
    if (path.sep !== '/') {
      result = 'hello world\r\n';
    } else {
      result = 'hello world\n';
    }
    t.equal(option.templates.page(), result);
    t.end();
  }
);

test(
  test_title +
  'customization is true and old theme dir is existed',
  function (t) {
    const TEST_PATH = path.resolve(__dirname, './fixture/theme/customization-true-old-themedir-exists');
    process.chdir(TEST_PATH);
    const option = theme({ theme: 'oceandeep', customization: true });
    let result = '';
    if (path.sep !== '/') {
      result = 'hello world\r\n';
    } else {
      result = 'hello world\n';
    }
    t.equal(option.templates.page(), result);
    const oldDir = path.resolve(
      __dirname,
      './fixture/theme/customization-true-old-themedir-exists',
      'themes' + path.sep + 'oceandeep'
    );
    const newDir = path.resolve(
      __dirname,
      './fixture/theme/customization-true-old-themedir-exists',
      THEMEDIR
    );
    fs.moveSync(newDir, oldDir);
    t.end();
  }
);

test(
  test_title +
  'customization is true and no theme dir exists',
  function (t) {
    const TEST_PATH = path.resolve(__dirname, './fixture/theme/customization-true-no-themedir-exists');
    const absoluteThemeDir = path.resolve(
      __dirname,
      './fixture/theme/customization-true-no-themedir-exists',
      THEMEDIR
    );
    process.chdir(TEST_PATH);
    const option = theme({ theme: 'oceandeep', customization: true });
    t.equal(fs.existsSync(absoluteThemeDir), true);
    t.equal(typeof option.templates.page, 'function');
    fs.removeSync(absoluteThemeDir);
    t.end();
  }
);

test(
  test_title +
  'customization is false',
  function (t) {
    const absoluteThemeDir = path.resolve(__dirname, THEMEDIR);
    const option = theme({ theme: 'oceandeep', customization: false });
    t.equal(fs.existsSync(absoluteThemeDir), false);
    t.equal(typeof option.templates.page, 'function');
    t.end();
  }
);
