import React from "react"

import Flag from "./Flag"

require('../css/country_item.sass')

export default class CountryCard extends React.Component {

  render() {
    const countryRegion = this.props.regions.filter(region => {
      return region.id === this.props.country.regionId
    })

    return (
      <div className="country-item">
        <h4>Round {this.props.country.round}</h4>
        <p>{this.props.country.name} - {countryRegion[0].regionName}</p>
      </div>
    )
  }
}