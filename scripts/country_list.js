

var InputDemo = React.createClass({
  getInitialState: function() {
    return {
      hasContent: false,
      content: ''
    }
  },

  changeHandler: function(e) {
    this.setState({content: e.target.value});
    this.setState({hasContent: this.state.content !== ''});
  },

  render: function() {
    var classes = this.state.hasContent ?
      'active' :
      'inactive';
    return <div className={classes}>
      <input type="text" onChange={this.changeHandler} />
      <ContentArea content={this.state.content} />
    </div>;
  }
});

var ContentArea = React.createClass({
  render: function() {
    return <div>
      <p>{this.props.content}</p>
    </div>;
  }
});

React.render(
  <InputDemo />,
  document.getElementById('content')
);