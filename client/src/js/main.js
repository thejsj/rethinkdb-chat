/*global io:true, $:true, console:true */
'use strict';
var React = require('react');

console.log('HELLO!!!!!');
console.log(window.location.href);
var socket = io.connect(window.location.href);
var messageCollection = [];
var ChatView = require('./views/chat-view');

var userName = prompt('Pick a username');

var render = function () {
  React.render(
    <ChatView messageCollection={ messageCollection } socket={ socket } userName={ userName }/>,
    document.getElementById('container')
  );
};
render();

socket.on('message', function (message) {
  console.log('Message', message);
  messageCollection.push(message);
  render();
});
