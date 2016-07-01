import React from 'react'
import classNames from 'classnames'

import CountryRegionSelect from './CountryRegionSelect'
import PanelButtons from '../panel/PanelButtons'

export default class CountryPanelEdit extends React.Component {

  render() {
    const { country, region, settings } = this.props

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
        <button 
          className={country._id === settings.goodCountry ? "selected" : ""} 
          onClick={this.props.setGoodCountry.bind(this, country._id)}>Good Country
        </button>
        <button 
          className={country._id === settings.badCountry ? "selected" : ""} 
          onClick={this.props.setBadCountry.bind(this, country._id)}>Bad Country
        </button>
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