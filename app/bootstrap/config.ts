import * as path from 'path';

export default function() {
  let env = process.env.NODE_ENV || 'development';
  let root = path.normalize(__dirname + '/../..');
  let appRoot = path.normalize(__dirname + '/..');

  let config = require('../../config/' + env);
  config.root = root;
  config.appRoot = appRoot;

  return config;
};
