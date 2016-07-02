import React from 'react'

import EditItem from '../panel/buttons/EditItem'
import CountryEditIcon from './CountryEditIcon'

export default class CountryPanelInfo extends React.Component {
  
  render() {
    const { country, region } = this.props

    return (
      <div className="country">
        <div className="title">
          <h5>{country.name}</h5>
          <CountryEditIcon {...this.props} />
        </div>
        <p>{region ? region.name : "Not Set"}</p>
      </div>
    )
  }
}