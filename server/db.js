/*jshint node:true */
'use strict';

var q = require('q');
var r = require('rethinkdbdash')({
  host: 'localhost',
  port: 28015,
  db: 'rethink_chat'
});

// Create Tables
r.tableList().run()
  .then(function (tableList) {
    return q()
      .then(function() {
        if (tableList.indexOf('messages') === -1) {
          return r.tableCreate('messages').run();
        }
      })
      .then(function () {
        if (tableList.indexOf('users') === -1) {
          return r.tableCreate('users').run();
        }
      })
      .then(function () {
        return r.table('messages').indexList().run()
          .then(function (indexList) {
            if (indexList.indexOf('created') === -1) {
              return r.table('messages').indexCreate('created');
            }
          });
      });
  });

module.exports = r;