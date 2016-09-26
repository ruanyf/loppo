'use strict';

const path = require('path');
const test = require('tape');
const theme = require('../lib/theme');
const walkSync = require('walk-sync');

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
    theme({ theme: 'oceandeep' });
    const result = walkSync(path.resolve(process.cwd(), 'themes', THEME));

    t.equal(result.length, 0);
    t.end();
  }
);
