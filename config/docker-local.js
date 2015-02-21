/*jshint node:true */
'use strict';
/**
 * Inherits from `default.js`
 */
var config = {
  'rethinkdb': {
    'host': process.env.DB_PORT_3306_TCP_ADDR,
  },
  'ports' : {
    'http' : process.env.PORT
  },
  'url': 'docker.dev'
};

module.exports = config;