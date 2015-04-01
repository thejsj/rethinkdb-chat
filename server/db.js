/*jshint node:true */
'use strict';

var config = require('config');
var q = require('q');
var r = require('rethinkdbdash')(config.get('rethinkdb'));

// Create Tables
r.dbList().run()
  .then(function (dbList) {
    if (dbList.indexOf(config.get('rethinkdb').db) === -1) {
      return r.dbCreate(config.get('rethinkdb').db).run();
    }
    return true;
  })
  .then(function () {
    return r.tableList().run();
  })
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
      })
      .catch(function (err) {
        console.log('Error creating tables', err);
      });
  });

module.exports = r;
