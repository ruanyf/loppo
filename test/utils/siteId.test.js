'use strict';

const test = require('tape');
const getSiteId = require('../../utils/siteId');

const log = require('../../lib/utils').log;
log.setLevel('error');

const test_title = '[util/siteId.js] ';

test(
  test_title +
  'return current dir name',
  function (t) {
    const originDir = process.cwd();
    process.chdir(__dirname);
    const result = getSiteId();
    t.equal(result, 'utils');
    process.chdir(originDir);
    t.end();
  }
);
