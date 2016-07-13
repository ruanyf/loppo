'use strict';

var config = require('./config');
var debug = require('debug')('[' + __filename + ']');
var log = require('./utils').log;

function loppo(option) {
  log.success('building docs starts...');
  debug('command line arguments %o', option);
  config(option);
  log.success('building docs ends.');
}

module.exports = loppo;
