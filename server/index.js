/*jshint node:true */
'use strict';

var config = require('config');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var r = require('./db');
var clientConfigParser = require('./clientConfigParser');

console.log('config');
console.log(config);

server.listen(config.get('ports').http);

// Static Dirname
app
  .use('/config.js', clientConfigParser)
  .use(express.static(__dirname + '/../client'));

io.on('connection', function (socket) {

  r.table('messages')
    .orderBy({index: 'created'})
    .run(r.conn)
    .then(function (messages) {
      messages.forEach(function (message) {
        socket.emit('message', message);
      });
    });

  // Listen to new message being inserted
  r.connect(config.get('rethinkdb'))
    .then(function (conn) {
      r.table('messages')
        .changes().run(conn)
        .then(function(cursor) {
          cursor.each(function (err, row) {
            socket.emit('message', row.new_val);
          }, function () {
            console.log('Finished');
          });
        });
    });

  // Insert new messages
  socket.on('message', function (data) {
    r.table('messages').insert({
      message: data.message,
      user: data.userName,
      created: (new Date()).getTime()
    }).run(r.conn);
  });

});
