import React from 'react'

import PanelButtons from '../panel/PanelButtons'

export default class RegionPanelEdit extends React.Component {
  render() {
    const { region } = this.props

    return (
      <div className="panel">
        <input 
          type="text"
          onChange={this.props.handleInputChange.bind(this)}
          value={this.props.inputValue}
        />
        <PanelButtons
          {...this.props}
          item={region}
          type="Region"
          editing={region.editing}
          handleItemSave={this.props.handleItemSave.bind(this)}
        />
      </div>
    )
  }
}