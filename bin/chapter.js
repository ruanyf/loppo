'use strict';

const promptly = require('promptly');
const fs = require('fs-extra');
const path = require('path');
const { log } = require('../lib/utils');
const readmeCheck = require('../utils/readmeCheck');
const chaptersLib = require('../lib/chapters');

function chapterHandler(option) {
  const chaptersFile = path.resolve(process.cwd(), 'chapters.yml');
  if (fs.existsSync(chaptersFile)) {
    fs.removeSync(chaptersFile);
  }
  chaptersLib(option);
}

module.exports = {
  command: 'chapter',
  desc: 'create new chapters.yml file',
  builder: yargs => yargs
    .option('force', {
      alias: 'f',
      describe: 'chapters.yml will be deleted without confirmation',
      type: 'boolean',
      default: 'false',
    }),
  handler: (argv) => {
    const str = 'This command will delete your chapters.yml if existed.\nAre you sure to continue? （Y/N）';
    if (!argv.force) {
      promptly.prompt(str, function (err, value) {
        const input = value.trim().toLowerCase();
        if (input !== 'y' && input !== 'yes') return;
        chapterHandler(argv);
      });
    } else {
      chapterHandler(argv);
    }
  }
};
