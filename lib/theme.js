'use strict';

const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const debug = require('debug')('[' + __filename + ']');
const log = require('./utils').log;
const walkSync = require('walk-sync');
const tmplEngine = require('tarim');

// supports <% includes xxx %> syntax
function includesHandler(templates) {
  const reg = /<%\s+includes\s+(.*?)\s+%>/g;
  const includesArr = [];
  while (true) {
    const match = reg.exec(templates.page);
    if (!match) break;
    includesArr.push(match);
  }
  includesArr.forEach(function (item) {
    templates.page = templates.page.replace(item[0], templates[item[1]]);
  });
  return templates;
}

function readTemplate(option, dest) {
  const THEME_DIR = 'themes' + path.sep + option.theme;
  const pathArr = walkSync(path.resolve(dest), {
    globs: ['*.template'],
    directories: false
  });
  pathArr.forEach(function (p) {
    const pageTemplate = fs.readFileSync(path.resolve(dest, p), 'utf8');
    if (!option.templates) option.templates = {};
    option.templates[p.substr(0, p.length - 9)] = tmplEngine(
      pageTemplate,
      {
        includePath: THEME_DIR,
        includeExt: '.template'
      }
    );
    // option.templates[p.substr(0, p.length - 9)] = _.template(pageTemplate);
  });
  /*
  const pageTemplate = fs.readFileSync(path.resolve(dest, 'page.template'), 'utf8');
  option.templates = {
    page: _.template(pageTemplate)
  };
  */
  // option.templates = includesHandler(option.templates);
  // option.templates.page = _.template(option.templates.page);
  debug('read templates succeed');

  return option;
}

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
    option = readTemplate(option, path.resolve(process.cwd(), THEME_DIR));
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
  // fs.ensureDirSync(theme_dest);
  fs.copySync(theme_src, theme_dest);

  debug('Copying theme directory succeed');

  option = readTemplate(option, theme_dest);

  log.success('[END] handle theme files');

  return option;
}

module.exports = theme;
