'use strict';

const test = require('tape');
const isHomepage = require('../../utils/isHomepage');

const log = require('../../lib/utils').log;
log.setLevel('error');

const test_title = '[util/isHomepage.js] ';

test(
  test_title +
  'if current path is /, return true',
  function (t) {
    const result = isHomepage('/');

    t.equal(result, true);
    t.end();
  }
);

test(
  test_title +
  'if current path is a.md, return false',
  function (t) {
    const result = isHomepage('a.md');

    t.equal(result, false);
    t.end();
  }
);
