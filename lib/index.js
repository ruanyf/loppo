'use strict';

const config = require('./config');
const chapters = require('./chapters');
const debug = require('debug')('[' + __filename + ']');
const log = require('./utils').log;

function loppo(option) {
  log.success('[BEGIN] build docs');
  debug('command line arguments %o', option);
  option = config(option);
  chapters(option);
  log.success('[END] build docs');
}

module.exports = loppo;
