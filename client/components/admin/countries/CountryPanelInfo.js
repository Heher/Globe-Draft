import React from 'react'

import PanelButtons from '../panel/PanelButtons'

export default class CountryPanelInfo extends React.Component {

  render() {
    const { country, region } = this.props

    return (
      <div className="panel">
        <p>{country.name}</p>
        <p>{region ? region.name : "Not Set"}</p>
        <PanelButtons {...this.props} item={country} type="Country" editing={country.editing} />
      </div>
    )
  }
}