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

  if (option.dir) cfg.dir = option.dir;
  if (option.output) cfg.output = option.output;

  var isConfigExists;
  try {
    fs.accessSync(path.resolve(process.cwd(), CONFIG_DEFAULT));
    isConfigExists = true;
  } catch(e) {
    isConfigExists = false;
  }

  debug('does config file exists? ' + isConfigExists);

  if (!isConfigExists) {
    
  }

  log.success('parsing config file ends.');
}

module.exports = config;
