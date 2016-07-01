import React from 'react'

import PanelButtons from '../panel/PanelButtons'
import EditItem from '../panel/buttons/EditItem'

export default class CountryPanelInfo extends React.Component {

  render() {
    const { country, region } = this.props

    return (
      <div className="country">
        <div className="title">
          <h5>{country.name}</h5>
          <EditItem {...this.props} item={country} type="Country" />
        </div>
        <p>{region ? region.name : "Not Set"}</p>
        <PanelButtons {...this.props} item={country} type="Country" editing={country.editing} />
      </div>
    )
  }
}