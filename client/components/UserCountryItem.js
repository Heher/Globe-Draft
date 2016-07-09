import React from "react"

import Flag from "./Flag"

require('../css/country_item.sass')

export default class UserCountryItem extends React.Component {

  render() {
    const { country } = this.props

    const countryRegion = this.props.regions.filter(region => {
      return region._id === this.props.country.regionId
    })[0]

    return (
      <li className="user-country-item">
        <div className="round-wrapper">
          <span className="round">{country.round}</span>
          <Flag country={country}/>
          <div className="country-wrapper">
            <span className="country">{country.name}</span>
            <span className="region">{countryRegion.name}</span>
          </div>
        </div>
      </li>
    )
  }
}