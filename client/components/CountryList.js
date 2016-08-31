import React from 'react'

import CountryItem from './CountryItem'

require('../css/country_list.sass')

export default function CountryList(props) {
  const countries = []
  for (let round = 1; round <= props.totalDraftRounds; round++) {
    countries.push(<CountryItem {...props} key={round} round={round} />)
  }

  return (
    <div className="country-list">
      <h2>Your Countries</h2>
      <ul>
        {countries}
      </ul>
    </div>
  )
}

CountryList.propTypes = {
  totalDraftRounds: React.PropTypes.number
}
