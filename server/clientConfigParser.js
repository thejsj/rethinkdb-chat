/*jshint node:true */
'use strict';
var config = require('config');

var clientConfigParser = function (req, res) {
  var _config = {
    'ports': config.get('client_ports') || config.get('ports'),
    'url': config.get('url')
  };
  var str = 'window.config = ' + JSON.stringify(_config) + ';';
  res
    .type('text/javascript')
    .send(str);
};

module.exports = clientConfigParser;
