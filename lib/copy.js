'use strict';

const fs = require('fs-extra');
const path = require('path');
// const debug = require('debug')('[' + __filename + ']');
const log = require('./utils').log;
const themePath = require('../utils/themePath');

function copy(option) {
  log.success('[BEGIN] copy assets to output directory');
  fs.removeSync(path.resolve(process.cwd(), option.output));

  if (option.customization === undefined) {
    fs.copySync(
      path.resolve(process.cwd(), 'themes', option.theme),
      path.resolve(process.cwd(), option.output),
      {
        filter(filePath) {
          return !/\.template$/.test(filePath);
        }
      }
    );
  }

  if (option.customization === false) {
    fs.copySync(
      themePath(option.theme),
      path.resolve(process.cwd(), option.output),
      {
        filter(filePath) {
          return !/\.template$/.test(filePath);
        }
      }
    );
  }

  if (option.customization === true) {
    fs.copySync(
      path.resolve(process.cwd(), option.themeDir),
      path.resolve(process.cwd(), option.output),
      {
        filter(filePath) {
          return !/\.template$/.test(filePath);
        }
      }
    );
  }

  // copy images sub directory
  if (fs.existsSync(
    path.resolve(process.cwd(), option.dir, 'images')
  )) {
    fs.ensureDirSync(path.resolve(process.cwd(), option.output, 'images'));
    fs.copySync(
      path.resolve(process.cwd(), option.dir, 'images'),
      path.resolve(process.cwd(), option.output, 'images'),
      {}
    );
  }
  log.success('[END] copy assets to output directory');
  return option;
}

module.exports = copy;
