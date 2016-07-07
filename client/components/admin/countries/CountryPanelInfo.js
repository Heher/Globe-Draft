import React from 'react'
import classNames from 'classnames'

import EditItem from '../panel/buttons/EditItem'
import CountryEditIcon from './CountryEditIcon'

export default class CountryPanelInfo extends React.Component {
  
  render() {
    const { country, region, settings } = this.props

    const renderClasses = classNames({
      'good': country._id === settings.goodCountry,
      'bad': country._id === settings.badCountry
    })

    return (
      <div className={`country ${renderClasses}`}>
        <div className="title">
          <h5>{country.name}</h5>
          <CountryEditIcon {...this.props} />
        </div>
        <p>{region ? region.name : "Not Set"}</p>
      </div>
    )
  }
}