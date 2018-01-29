import React from 'react'

import Flag from './Flag'

require('../css/country_item.sass')

export default function CountryItem(props) {
  const { round, userCountries } = props

  const foundDraft = userCountries.find(draft => draft.round === round)

  if (foundDraft) {
    const { country } = foundDraft;
    const countryRegion = props.regions.find(region => region._id === country.regionId)

    return (
      <li className="country-item">
        <div className="round-wrapper">
          <span className="round">{round}</span>
          <Flag country={country} />
          <div className="country-wrapper">
            <span className="country">{country.name}</span>
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
  regions: React.PropTypes.array.isRequired,
  userCountries: React.PropTypes.array
}
