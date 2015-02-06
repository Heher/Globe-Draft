var CountryList = React.createClass({
  render: function() {
    return (
      <div className="countryList">
        Hello, I am the placeholder for the country list.
      </div>
    );
  }
});
React.render(
  <CountryList />,
  document.getElementById('content')
);