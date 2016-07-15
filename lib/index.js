'use strict';

const config = require('./config');
const debug = require('debug')('[' + __filename + ']');
const log = require('./utils').log;

function loppo(option) {
  log.success('[BEGIN] build docs');
  debug('command line arguments %o', option);
  config(option);
  log.success('[END] build docs');
}

module.exports = loppo;
