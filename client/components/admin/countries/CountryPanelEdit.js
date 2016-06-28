import React from 'react'

import CountryRegionSelect from './CountryRegionSelect'
import PanelButtons from '../panel/PanelButtons'

export default class CountryPanelEdit extends React.Component {
  render() {
    const { country, region } = this.props

    return (
      <div className="panel">
        <input 
          type="text"
          onChange={this.props.handleInputChange.bind(this)}
          value={this.props.inputValue}
        />
        <CountryRegionSelect 
          {...this.props}
          handleSelectChange={this.props.handleSelectChange.bind(this)}
          regionValue={this.props.regionValue}
        />
        <PanelButtons
          {...this.props}
          item={country}
          type="Country"
          editing={country.editing}
          handleItemSave={this.props.handleItemSave.bind(this)}
        />
      </div>
    )
  }
}