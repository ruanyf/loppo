'use strict';

// const fs = require('fs-extra');
// const path = require('path');
const debug = require('debug')('[' + __filename + ']');
const log = require('./utils').log;
const makePage = require('./utils').makePage;

function page(option) {
  log.success('[BEGIN] publish pages to output directory');
  makePage('/', option);
  option.chapters.forEach(function (pageObj) {
    makePage(Object.keys(pageObj)[0], option);
  });
  debug('makePage succeed');
  log.success('[END] publish pages to output directory');
  return option;
}

module.exports = page;
