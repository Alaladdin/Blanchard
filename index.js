const liveServer = require('live-server');

const params = {
  port: 8080,
  host: '0.0.0.0',
  open: false,
  ignorePattern: /(scss|sass)/,
  file: 'index.html',
  logLevel: 0,
};

liveServer.start(params);
