'use strict';

const connect = require('connect');
const serveStatic = require('serve-static');
const path = require('path');

module.exports = {
  command: 'server',
  desc: 'build the docs and run a web server',
  handler: (argv) => {
    const option = require('../lib')(argv);
    connect()
      .use(serveStatic(path.resolve(process.cwd(), option.output)))
      .listen(8080, function () {
        console.log('Server running on 8080...');
      });
  }
};
