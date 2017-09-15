'use strict';

const fs = require('fs-extra');
const path = require('path');
const yaml = require('js-yaml');
const debug = require('debug')('[' + __filename + ']');
const log = require('./utils').log;

const CONFIG_FILE = 'loppo.yml';
const CONFIG_DEFAULT = '../loppo.yml.default';

function config(option) {
  log.success('[BEGIN] handle config file');

  // find whether user's config file exists
  let isConfigExists;
  try {
    fs.accessSync(path.resolve(process.cwd(), CONFIG_FILE));
    isConfigExists = true;
  } catch (e) {
    isConfigExists = false;
  }

  debug('does config file exists? ' + isConfigExists);

  // read config file
  let cfg;
  let cfg_content;
  if (!isConfigExists) {
    cfg_content = fs.readFileSync(path.resolve(__dirname, CONFIG_DEFAULT), 'utf8');
  } else {
    cfg_content = fs.readFileSync(path.resolve(process.cwd(), CONFIG_FILE), 'utf8');
  }
  try {
    cfg = yaml.safeLoad(cfg_content);
    debug('config file %o', cfg);
  } catch (e) {
    log.error(e);
    throw e;
  }

  // merge option into config
  if (option.dir && option.dir !== 'docs') cfg.dir = option.dir;
  if (option.output && option.output !== 'dist') cfg.output = option.output;
  if (option.site && option.site !== 'Documents') cfg.site = option.site;
  if (option.direction) cfg.direction = option.direction;
  if (option.theme) cfg.theme = option.theme;
  debug('config object %o', cfg);

  // If config file doesn't exist, copy the defalut
  if (!isConfigExists) {
    try {
      /*
      fs.copySync(
        path.resolve(__dirname, CONFIG_DEFAULT),
        path.resolve(process.cwd(), CONFIG_FILE)
      );
      */
      fs.writeFileSync(
        path.resolve(process.cwd(), CONFIG_FILE),
        yaml.safeDump(cfg),
        'utf8'
      );
      log.info('[INFO] create the config file');
    } catch (e) {
      log.error(e);
      throw e;
    }
  }

  // add loppo_version into option
  const pkg = require(path.join(__dirname, '../package.json'));
  cfg.loppo_version = pkg.version;

  log.success('[END] handle config file');

  return cfg;
}

module.exports = config;
