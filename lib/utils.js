'use strict';

const path = require('path');

const log4js = require('log4js');
log4js.configure(path.resolve(__dirname, './log4js.config.json'));
const logSymbols = require('log-symbols');
const log = log4js.getLogger('loppo');
const logWithIcon = {};

function noop() {}

logWithIcon.info = function info(...args) {
  process.stdout.write(logSymbols.info + ' ');
  log.info.apply(log, args);
};

logWithIcon.success = function success(...args) {
  process.stdout.write(logSymbols.success + ' ');
  log.info.apply(log, args);
};

logWithIcon.warn = function warn(...args) {
  process.stdout.write(logSymbols.warning + ' ');
  log.warn.apply(log, args);
};

logWithIcon.error = function error(...args) {
  process.stdout.write(logSymbols.error + ' ');
  log.error.apply(log, args);
};

logWithIcon.fatal = function fatal(...args) {
  process.stdout.write(logSymbols.error + ' ');
  log.fatal.apply(log, args);
};

logWithIcon.setLevel = function setLevel(...args) {
  log.setLevel.call(log, args[0]);
  if (args[0].toLowerCase() === 'warn') {
    logWithIcon.info = noop;
    logWithIcon.success = noop;
  }
  if (args[0].toLowerCase() === 'error') {
    logWithIcon.info = noop;
    logWithIcon.success = noop;
    logWithIcon.warn = noop;
  }
  if (args[0].toLowerCase() === 'fatal') {
    logWithIcon.info = noop;
    logWithIcon.success = noop;
    logWithIcon.warn = noop;
    logWithIcon.fatal = noop;
  }
};

exports.log = logWithIcon;
