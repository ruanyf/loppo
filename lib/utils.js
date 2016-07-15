'use strict';

const path = require('path');

const log4js = require('log4js');
log4js.configure(path.resolve(__dirname, './log4js.config.json'));
const logSymbols = require('log-symbols');
const log = log4js.getLogger('loppo');
const logWithIcon = {};

function noop() {}

logWithIcon.info = function info() {
  process.stdout.write(logSymbols.info + ' ');
  log.info.apply(log, arguments);
};

logWithIcon.success = function success() {
  process.stdout.write(logSymbols.success + ' ');
  log.info.apply(log, arguments);
};

logWithIcon.warn = function warn() {
  process.stdout.write(logSymbols.warning + ' ');
  log.warn.apply(log, arguments);
};

logWithIcon.error = function error() {
  process.stdout.write(logSymbols.error + ' ');
  log.error.apply(log, arguments);
};

logWithIcon.fatal = function fatal() {
  process.stdout.write(logSymbols.error + ' ');
  log.fatal.apply(log, arguments);
};

logWithIcon.setLevel = function setLevel() {
  log.setLevel.call(log, arguments[0]);
  if (arguments[0].toLowerCase() === 'warn') {
    logWithIcon.info = noop;
    logWithIcon.success = noop;
  }
  if (arguments[0].toLowerCase() === 'error') {
    logWithIcon.info = noop;
    logWithIcon.success = noop;
    logWithIcon.warn = noop;
  }
  if (arguments[0].toLowerCase() === 'fatal') {
    logWithIcon.info = noop;
    logWithIcon.success = noop;
    logWithIcon.warn = noop;
    logWithIcon.fatal = noop;
  }
};

exports.log = logWithIcon;
