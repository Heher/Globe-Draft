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
        <p>{this.state.newCountry}</p>
      </div>
    );
  }
});

var CountryListItem = React.createClass({
  getInitialState: function() {
    return {
      gold: this.props.data.gold,
      silver: this.props.data.silver,
      bronze: this.props.data.bronze,
      total: +this.props.data.gold + +this.props.data.silver + +this.props.data.bronze
    }
  },
  addGold: function() {
    this.setState({
      gold: +this.state.gold + 1,
      total: +this.state.total + 1
    });
  },
  addSilver: function() {
    this.setState({
      silver: +this.state.silver + 1,
      total: +this.state.total + 1
    });
  },
  addBronze: function() {
    this.setState({
      bronze: +this.state.bronze + 1,
      total: +this.state.total + 1
    });
  },
  render: function() {
    var total = +this.props.data.gold + +this.props.data.silver + +this.props.data.bronze;
    var country = this.props.data.country + " - " + this.state.gold + " - " + this.state.silver + " - " + this.state.bronze + " - " + this.state.total;
    return <li>{country}<button onClick={this.addGold}>Add Gold</button><button onClick={this.addSilver}>Add Silver</button><button onClick={this.addBronze}>Add Bronze</button></li>;
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
      countries: this.props.countries
    }
  },
  addCountry: function(country) {
    this.setState({
      countries: this.state.countries.concat([{"country":country, "gold":"0", "silver":"0", "bronze":"0"}])
    });
  },
  render: function(){
    return (
      <div>
        <CountryList countries={this.state.countries} />
        <AddCountry addNew={this.addCountry} />
      </div>
    )
  }
});

$.get('countries.json').then(function(data) {
  React.render(<CountriesApp countries={data}/>, document.getElementById('countries_list'));
}, function(error) {
  console.log(error);
});