import React from "react"

import Flag from "./Flag"

require('../css/country_item.sass')

export default class CountryItem extends React.Component {

  render() {
    const { round } = this.props

    const country = this.props.countries.filter(country => {
      return ((country.userId === this.props.currentUser._id) && (country.round === round) && country.drafted)
    })[0]

    if (country) {
      const countryRegion = this.props.regions.filter(region => {
        return region._id === country.regionId
      })[0]

      return (
        <li className="country-item">
          <div className="round-wrapper">
            <span className="round">{round}</span>
            <Flag country={country}/>
            <div className="country-wrapper">
              <span className="country">{country.name}</span>
              <span className="region">{countryRegion.name}</span>
            </div>
          </div>
        </li>
      )
    } else {
      return (
        <li className="country-item">
          <div className="round-wrapper">
            <span className="round">{round}</span>
          </div>
        </li>
      )
    }
  }
}