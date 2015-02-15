'use strict';
var React = require('react');

var NewMessageFormView = React.createClass({
  getInitialState: function() {
    return {value: 'Hello!'};
  },
  handleChange: function () {
    this.setState({value: event.target.value});
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var text = this.state.value;
    this.props.socket.emit('message', {
      message: text,
      user: 'thejsj'
    });
    this.state.value = '';
  },
  render: function () {
    var value = this.state.value;
    return (
      <form id='message-form' onSubmit={ this.handleSubmit }>
        <div class="form-group">
          <input type='text' className="form-control" value={value} onChange={this.handleChange} placeholder='Your Message Here' />
          <input type='submit' className="btn btn-default" />
        </div>
      </form>
    );
  }
});

module.exports = NewMessageFormView;