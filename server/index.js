/*jshint node:true */
'use strict';

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var r = require('./db');
var _ = require('lodash');

server.listen(8000);

// Static Dirname
app.use(express.static(__dirname + '/../client'));

io.on('connection', function (socket) {

  r.table('messages')
    .orderBy({index: 'created'})
    .run()
    .then(function (messages) {
      messages.forEach(function (message) {
        socket.emit('message', message);
      });
    });

  // Listen to new message being inserted
  r.table('messages').changes().run()
    .then(function(cursor) {
      cursor.each(function (err, row) {
        socket.emit('message', row.new_val);
      });
    })
    .catch(function (err) {
      console.log('err', err);
    });

  // Insert new messages
  socket.on('message', function (data) {
    r.table('messages').insert({
      message: data.message,
      user: data.userName,
      created: (new Date()).getTime()
    }).run();
  });

});