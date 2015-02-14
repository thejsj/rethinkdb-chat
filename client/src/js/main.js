/*global io:true, $:true, console:true */
'use strict';

var $form = $('#message-form');
var $messages = $('.messages');
var $textarea = $form.find('textarea');

var socket = io.connect('http://localhost:8000');

socket.on('message', function (message) {
  $messages.prepend('<div class="panel panel-default">\
    <div class="panel-heading">\
      <a href="#">' + message.user + '</a>\
    </div>\
    <div class="panel-body">\
      <p>' + message.message + '</p>\
    </div>\
  </div>');
});

$form.submit(function (e) {
  var text = $textarea.val();
  $textarea.val('');
  socket.emit('message', {
    message: text,
    user: 'thejsj'
  });
  e.preventDefault();
});