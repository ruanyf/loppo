'use strict';

const fs = require('fs-extra');
const path = require('path');
const debug = require('debug')('[' + __filename + ']');
const log = require('./utils').log;

function theme(option) {
  log.success('[BEGIN] handle theme files');

  // find whether the theme file exists
  let isThemeExists;
  const THEME_DIR = 'themes' + path.sep + option.theme;

  try {
    fs.accessSync(path.resolve(process.cwd(), THEME_DIR));
    isThemeExists = true;
  } catch (e) {
    isThemeExists = false;
  }

  debug('does theme file exists? ' + isThemeExists);

  if (isThemeExists) {
    log.success('[END] handle theme files');
    return option;
  }

  let theme_src = '';
  try {
    theme_src = require('loppo-theme-' + option.theme);
  } catch (e) {
    theme_src = require(path.resolve(__dirname, '../node_modules', 'loppo-theme-' + option.theme));
  }
  const theme_dest = path.resolve(process.cwd(), 'themes', option.theme);
  fs.ensureDirSync(theme_dest);
  fs.copySync(theme_src, theme_dest);

  debug('Copying theme directory succeed');

  log.success('[END] handle theme files');
  return option;
}

module.exports = theme;
