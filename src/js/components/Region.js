import React from "react";

import CountryCard from "./CountryCard";

let owner = {
  id: 123,
  avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/igorgarybaldi/128.jpg"
}

let user = {
  id: 890,
  avatar_url: "https://robohash.org/user"
}

export default class Region extends React.Component {

  render() {
    const countries = this.props.region.countries.map(function(country, index) {
      return <CountryCard key={index} owner={owner} country={country} currentUser={user} />;
    });
    return (
      <div>
        <h3>{this.props.region.regionName}</h3>
        {countries}
      </div>
    )
  }
}