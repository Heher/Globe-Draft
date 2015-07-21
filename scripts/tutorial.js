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

var CountryListItem = React.createClass({
  render: function() {
    var country = this.props.data.country + " - " + this.props.data.medals;
    return <li>{country}</li>;
  }
});

var CountryList = React.createClass({
  render: function() {
    return (
      <ul>
        {this.props.countries.map(function(country, index) {
          return <CountryListItem key={index} data={country}/>;
        })}
      </ul>
    );
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
        <CountryList countries={this.state.countries} />
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