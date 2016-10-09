'use strict';

// const fs = require('fs-extra');
// const path = require('path');
const debug = require('debug')('[' + __filename + ']');
const log = require('./utils').log;
const makeIndex = require('./utils').makeIndex;

function page(option) {
  log.success('[BEGIN] publish pages to output directory');
  makeIndex('/', option);
  debug('makeIndex succeed');
  log.success('[END] publish pages to output directory');
  return option;
}

module.exports = page;
