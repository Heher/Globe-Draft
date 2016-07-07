import React from 'react'

import PanelButtons from '../panel/PanelButtons'
import CancelEdit from '../panel/buttons/CancelEdit'
import SaveItem from '../panel/buttons/SaveItem'
import DeleteItem from '../panel/buttons/DeleteItem'

export default class RegionPanelEdit extends React.Component {
  render() {
    const { region } = this.props

    return (
      <div className="region">
        <div className="title">
          <input 
            type="text"
            onChange={this.props.handleInputChange.bind(this)}
            value={this.props.inputValue}
          />
          <CancelEdit {...this.props} item={region} type="Region" />
        </div>
        <input
          type="text"
          onChange={this.props.handleMaxCountriesChange.bind(this)}
          value={this.props.maxCountriesValue}
        />
        <div className="action-buttons">
          <SaveItem {...this.props} item={region} type="Region" handleItemSave={this.props.handleItemSave.bind(this)}/>
          <DeleteItem {...this.props} item={region} type="Region" />
        </div>
      </div>
    )
  }
}