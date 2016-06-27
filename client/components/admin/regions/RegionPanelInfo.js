import React from 'react'

import PanelButtons from '../panel/PanelButtons'

export default class RegionPanelInfo extends React.Component {

  render() {
    const { region } = this.props

    return (
      <div className="panel">
        <p>{region.name}</p>
        <PanelButtons {...this.props} item={region} type="Region" editing={region.editing} />
      </div>
    )
  }
}