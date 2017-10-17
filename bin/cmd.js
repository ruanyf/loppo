#!/usr/bin/env node

const path = require('path');

const argv = require('yargs')
  .usage('Usage: loppo [Options], loppo [Commands] [Options]')
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
  .option('site', {
    alias: 's',
    default: 'Documents',
    describe: 'site name',
    type: 'string'
  })
  .option('direction', {
    default: 'ltr',
    describe: 'document character direction',
    type: 'string'
  })
  .option('theme', {
    alias: 't',
    describe: 'theme name',
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
  .command(require('./server'))
  .command(require('./count'))
  .help('help')
  .example('loppo --dir docs --output dist')
  .example('loppo server')
  .argv;

if (argv.version) {
  const pkg = require(path.join(__dirname, '../package.json'));
  console.log(pkg.version);
  process.exit(0);
}

if (argv.debug) {
  process.env.DEBUG = '*';
}

if (
  argv._.indexOf('server') === -1 &&
  argv._.indexOf('count') === -1
) {
  require('../lib')(argv);
}

