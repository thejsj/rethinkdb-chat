'use strict';
var React = require('react');
var _ = require('lodash');

var MessageCollectionView = React.createClass({
  render: function() {
    var messageCollection = this.props.messageCollection;
    setTimeout(function () {
      // I'm on the train and can't google a better way to do this....
      var div = document.querySelector('.message-collection-container');
      div.scrollTop = Infinity;
    });
    return (
      <div className='message-collection-container'>
        {messageCollection.map(function(item, i) {
          return (
            <div className='message'>
              <div className='message-body'>
                <p><a href="#">{ item.user }</a>: { item.message }</p>
              </div>
            </div>
          );
        }, this)}
      </div>
    );
  }
});

module.exports = MessageCollectionView;