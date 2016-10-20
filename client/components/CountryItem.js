import React from 'react'

import Flag from './Flag'

require('../css/country_item.sass')

export default function CountryItem(props) {
  const { round, countries, currentUser } = props

  const foundCountry = countries.find(country => (
    (country.userId === currentUser._id) && (country.round === round) && country.drafted
  ))

  if (foundCountry) {
    const countryRegion = this.props.regions.find(region => region._id === foundCountry.regionId)

    return (
      <li className="country-item">
        <div className="round-wrapper">
          <span className="round">{round}</span>
          <Flag country={foundCountry} />
          <div className="country-wrapper">
            <span className="country">{foundCountry.name}</span>
            <span className="region">{countryRegion.name}</span>
          </div>
        </div>
      </li>
    )
  }

  return (
    <li className="country-item">
      <div className="round-wrapper">
        <span className="round">{round}</span>
      </div>
    </li>
  )
}

CountryItem.propTypes = {
  round: React.PropTypes.number.isRequired,
  countries: React.PropTypes.array.isRequired,
  currentUser: React.PropTypes.object.isRequired,
  regions: React.PropTypes.array.isRequired
}
