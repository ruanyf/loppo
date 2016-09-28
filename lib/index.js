'use strict';

const config = require('./config');
const chapters = require('./chapters');
const theme = require('./theme');
const copy = require('./copy');
const debug = require('debug')('[' + __filename + ']');
const log = require('./utils').log;

function loppo(option) {
  log.success('[BEGIN] build docs');
  debug('command line arguments %o', option);
  option = config(option);
  option = chapters(option);
  option = theme(option);
  option = copy(option);
  log.success('[END] build docs');
}

module.exports = loppo;
