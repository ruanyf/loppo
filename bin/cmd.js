#!/usr/bin/env node

const path = require('path');

const argv = require('yargs')
  .usage('Usage: loppo [Options]')
  .option('dir', {
    alias: 'd',
    default: 'docs',
    describe: 'document directory',
    type: 'string'
  })
  .option('output', {
    alias: 'o',
    default: 'dist',
    describe: 'output directory',
    type: 'string'
  })
  .option('debug', {
    default: false,
    describe: 'debug mode',
    type: 'boolean'
  })
  .option('version', {
    alias: 'v',
    describe: 'version information',
    type: 'boolean'
  })
  .option('help', {
    alias: 'h',
    describe: 'help information',
    type: 'boolean'
  })
  .help('help')
  .example('loppo --dir docs --output dist')
  .argv;

if (argv.version) {
  const pkg = require(path.join(__dirname, '../package.json'));
  console.log(pkg.version);
  process.exit(0);
}

if (argv.debug) {
  process.env.DEBUG = '*';
}

require('../lib')(argv);

