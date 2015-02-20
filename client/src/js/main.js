/*global io:true, $:true, console:true */
'use strict';
var React = require('react');

var socket = io.connect('http://localhost:8000');
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
  messageCollection.push(message);
  render();
});