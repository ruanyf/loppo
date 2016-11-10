'use strict';

// const path = require('path');
const test = require('tape');
// const fs = require('fs-extra');
const makeBuildTime = require('../lib/utils').makeBuildTime;

const log = require('../lib/utils').log;
log.setLevel('error');

const test_title = '[utils.js/makeBuildTime] ';

test(
  test_title +
  'should be a Date instance',
  function (t) {
    const opt = {
      dir: 'docs',
      site: 'My Site',
      chapters: []
    };
    const optionObj = makeBuildTime('/', opt);
    t.ok(optionObj.build_time instanceof Date);
    t.end();
  }
);
