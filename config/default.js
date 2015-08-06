/*jshint node:true */
'use strict';
/**
 * Configuration Structure
 *
 * default.js
 * - test.js
 * - development.js
 * - - staging.js
 * - - - production.js
 */
var config = {
  'rethinkdb': {
    'host': '0.0.0.0',
    'port': 28015,
    'db': 'rethink_chat'
  },
  'ports' : {
    'http' : 9000
  },
  'client_ports' : {
    'http' : 6080
  },
  'url': 'local.sandstrom.io',
};

module.exports = config;
