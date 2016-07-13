'use strict';
var fs = require('fs');
var path = require('path');
var yaml = require('js-yaml');
var debug = require('debug')('[' + __filename + ']');
var log = require('./utils').log;

var CONFIG_DEFAULT = '../config.yml.default';

function config(option) {
  log.success('parsing config file starts...');
  var cfg_file = fs.readFileSync(path.resolve(__dirname, CONFIG_DEFAULT), 'utf8');
  debug('config file %o', cfg_file);
  try {
    var cfg = yaml.safeLoad(cfg_file);
    debug('yaml object %o', cfg);
  } catch (e) {
    log.error(e);
  }
  log.success('parsing config file ends.');
}

module.exports = config;
