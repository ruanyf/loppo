'use strict';

// const path = require('path');
const test = require('tape');
// const fs = require('fs-extra');
const makeIndex = require('../lib/utils').makeIndex;

const log = require('../lib/utils').log;
log.setLevel('error');

const test_title = '[utils.js/makeIndex] ';

test(
  test_title +
  'root param: Not root index, and not in Chapters Array, should throw an error',
  function (t) {
    const opt = {
      chapters: ['dir1/', 'dir1/a.md', 'dir2/', 'dir2/b.md']
    };
    t.throws(function () {
      makeIndex('dir3/', opt);
    });
    t.end();
  }
);

