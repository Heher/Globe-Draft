import React from 'react'

import PanelButtons from '../panel/PanelButtons'
import EditItem from '../panel/buttons/EditItem'

export default class RegionPanelInfo extends React.Component {

  render() {
    const { region } = this.props

    return (
      <div className="region">
        <div className="title">
          <h5>{region.name}</h5>
          <EditItem {...this.props} item={region} type="Region" />
        </div>
        <p>Countries allowed: {region.maxCountriesSelected}</p>
      </div>
    )
  }
}