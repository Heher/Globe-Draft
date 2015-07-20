var AddCountry = React.createClass({
  getInitialState: function() {
    return {
      newCountry: ''
    }
  },
  updateNewCountry: function(event) {
    this.setState({
      newCountry: event.target.value
    });
  },
  handleAddCountry: function() {
    this.props.addNew(this.state.newCountry);
    this.setState({
      newCountry: ''
    });
  },
  render: function() {
    return (
      <div>
        <input type="text" value={this.state.newCountry} onChange={this.updateNewCountry} />
        <button onClick={this.handleAddCountry}>Add Country</button>
      </div>
    );
  }
});

var ShowList = React.createClass({
  render: function(){
    var listItems = this.props.countries.map(function(k,v){
      return <li>{k}</li>;
    });
    return (
      <ul>
        {listItems}
      </ul>
    )
  }
});

var CountriesApp = React.createClass({
  getInitialState: function(){
    return {
      name: "John",
      countries: this.props.countries
    }
  },
  addCountry: function(country) {
    this.setState({
      countries: this.state.countries.concat([country])
    });
  },
  render: function(){
    return (
      <div>
        Hello {this.state.name}! <br />
        <ShowList countries={this.state.countries} />
        <AddCountry addNew={this.addCountry} />
      </div>
    )
  }
});

$.get('countries.json').then(function(data) {
  React.render(<CountriesApp countries={data}/>, document.getElementById('content'));
}, function(error) {
  console.log(error);
});