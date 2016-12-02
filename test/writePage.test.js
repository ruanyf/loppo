'use strict';

const path = require('path');
const fs = require('fs-extra');
const test = require('tape');
// const yaml = require('js-yaml');
const _ = require('lodash');
const writePage = require('../lib/utils').writePage;

const log = require('../lib/utils').log;
log.setLevel('error');

const test_title = '[utils.js/writePage] ';

test(
  test_title +
  'simple write',
  function (t) {
    const TEST_PATH = path.resolve(__dirname, './fixture/writePage/simple-write');
    process.chdir(TEST_PATH);
    const opt = {
      output: 'dist',
      content: '<h2>My Title</h2><p>Hello World</p>',
      templates: {}
    };

    opt.templates.page = _.template('<%= content %>');

    writePage('/', opt);

    t.ok(fs.existsSync(path.join(TEST_PATH, opt.output, 'index.html')));
    t.equal(
      fs.readFileSync(path.join(TEST_PATH, opt.output, 'index.html'), 'utf8'),
      '<h2>My Title</h2><p>Hello World</p>'
    );
    t.end();
    fs.removeSync(path.join(TEST_PATH, opt.output));
  }
);
