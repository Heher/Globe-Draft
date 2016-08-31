import React from 'react'

import Flag from './Flag'

require('../css/country_item.sass')

export default function UserCountryItem(props) {
  const { country, regions } = props

  const countryRegion = regions.find(region => region._id === country.regionId)

  return (
    <li className="user-country-item">
      <div className="round-wrapper">
        <span className="round">{country.round}</span>
        <Flag country={country} />
        <div className="country-wrapper">
          <span className="country">{country.name}</span>
          <span className="region">{countryRegion.name}</span>
        </div>
      </div>
    </li>
  )
}

UserCountryItem.propTypes = {
  country: React.PropTypes.object.isRequired,
  regions: React.PropTypes.array.isRequired
}
