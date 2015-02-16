'use strict';
var React = require('react');
var _ = require('lodash');

var MessageCollectionView = React.createClass({
  render: function() {
    var messageCollection = this.props.messageCollection;
    return (
      <div className='message-collection-container'>
        {messageCollection.map(function(item, i) {
          return (
            <div className='message'>
              <div className='message-heading'>
                <a href="#">{ item.user }</a>
              </div>
              <div className='message-body'>
                <p>{ item.message }</p>
              </div>
            </div>
          );
        }, this)}
      </div>
    );
  }
});

module.exports = MessageCollectionView;