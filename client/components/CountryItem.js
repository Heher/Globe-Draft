import React from "react";

import Flag from "./Flag";

export default class CountryCard extends React.Component {

  render() {

    return (
      <div className="country-item">
        <p>Round {this.props.country.round}</p>
        <p>{this.props.country.name}</p>
      </div>
    )
  }
}