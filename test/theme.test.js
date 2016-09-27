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

test(
  test_title +
  'if the theme directory already exists, the directory will have no changes',
  function (t) {
    const TEST_PATH = path.resolve(__dirname, './fixture/theme/theme-exists');
    process.chdir(TEST_PATH);
    const option = theme({ theme: THEME });
    // const result = walkSync(path.resolve(process.cwd(), 'themes', THEME));
    t.equal(option.templates.page(), 'hello world\n');
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
