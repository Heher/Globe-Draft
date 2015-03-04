$.getJSON( "countries.json", function( data ) {
  $.each(data, function(k, v) {
    console.log(v.country);
    console.log(v.medals);
  });
});

var Countries = [
  {
    "country":"USA"
  },
  {
    "country":"China"
  }
];

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
    var listItems = this.props.countries.map(function(country){
      return <li>{country}</li>;
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
      countries: Countries
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

React.render(<CountriesApp />, document.getElementById('content'));