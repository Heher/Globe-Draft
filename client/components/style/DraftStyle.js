import React from 'react'

import CountryCard from '../CountryCard'

export default function DraftStyle(props) {
  return (
    <div className="draft">
      <h2>Country</h2>
      <CountryCard {...props} country={props.countries[0]} />
    </div>
  )
}
