import React from 'react'
import classNames from 'classnames'

import Flag from '../Flag'
import Avatar from '../Avatar'

export default function MedalWinner(props) {
  const { country, settings, currentUser, selectedCountry } = props
  if (country) {
    const settingsClasses = classNames({
      good: country._id === settings.goodCountry,
      bad: country._id === settings.badCountry,
      taken: country.userId,
      owned: country.userId === currentUser._id,
      selected: country._id === selectedCountry
    })
    return (
      <div className={`winner ${settingsClasses}`}>
        <div className="winner-name">
          <span className="medal">{country.points}</span>
          <Flag country={country} />
          <p>
            {country.name}
            {country.userId ? <Avatar {...props} userId={country.userId} /> : null}
          </p>
        </div>
      </div>
    )
  }
  return (
    <div key={0} className="winner">
      <div className="winner-name">
        <span className="medal">&nbsp;</span>
        <p>
          No Winner
        </p>
      </div>
    </div>
  )// &nbsp needed for flexbox to correctly align
}

MedalWinner.propTypes = {
  country: React.PropTypes.object,
  settings: React.PropTypes.object,
  currentUser: React.PropTypes.object,
  selectedCountry: React.PropTypes.string
}
