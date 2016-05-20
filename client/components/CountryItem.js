import React from "react";

import Flag from "./Flag";

export default class CountryCard extends React.Component {

  render() {

    return (
      <div className="country-item">
        <p>{this.props.country.name}</p>
      </div>
    )
  }
}