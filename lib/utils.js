'use strict';

var path = require('path');

var log4js = require('log4js');
log4js.configure(path.resolve(__dirname, './log4js.config.json'));
var logSymbols = require('log-symbols');
var log = log4js.getLogger('loppo');
var logWithIcon = {}

logWithIcon.info = function () {
  process.stdout.write(logSymbols.info + ' ');
  log.info.apply(log, arguments);
}

logWithIcon.success = function () {
  process.stdout.write(logSymbols.success + ' ');
  log.info.apply(log, arguments);
}

logWithIcon.warn = function () {
  process.stdout.write(logSymbols.warning + ' ');
  log.warn.apply(log, arguments);
}

logWithIcon.error = function () {
  process.stdout.write(logSymbols.error + ' ');
  log.error.apply(log, arguments);
}

logWithIcon.fatal = function () {
  process.stdout.write(logSymbols.error + ' ');
  log.fatal.apply(log, arguments);
}

logWithIcon.setLevel = function () {
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

function noop() {}

exports.log = logWithIcon;
