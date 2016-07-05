import React from "react"

import Flag from "./Flag"

require('../css/country_item.sass')

export default class CountryItem extends React.Component {

  render() {
    const countryRegion = this.props.regions.filter(region => {
      return region._id === this.props.country.regionId
    })[0]

    return (
      <div className="country-item">
        <h4>Round {this.props.country.round}</h4>
        <p>{this.props.country.name} - {countryRegion.name}</p>
      </div>
    )
  }
}