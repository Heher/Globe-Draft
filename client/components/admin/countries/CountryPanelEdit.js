import React from 'react'
import classNames from 'classnames'

import CancelEdit from '../panel/buttons/CancelEdit'
import DeleteItem from '../panel/buttons/DeleteItem'
import SaveItem from '../panel/buttons/SaveItem'
import CountryRegionSelect from './CountryRegionSelect'
import PanelButtons from '../panel/PanelButtons'

export default class CountryPanelEdit extends React.Component {

  render() {
    const { country, region, settings } = this.props

    return (
      <div className="country">
        <div className="title">
          <input 
            type="text"
            onChange={this.props.handleInputChange.bind(this)}
            value={this.props.inputValue}
          />
          <CancelEdit {...this.props} item={country} type="Country" />
        </div>
        <input 
          type="text"
          onChange={this.props.handleShortNameChange.bind(this)}
          value={this.props.shortNameValue}
        />
        <CountryRegionSelect 
          {...this.props}
          handleSelectChange={this.props.handleSelectChange.bind(this)}
          regionValue={this.props.regionValue}
        />
        <div className="country-settings">
          <button 
            className={country._id === settings.goodCountry ? "selected" : ""} 
            onClick={this.props.setGoodCountry.bind(this, country._id)}>Good Country
          </button>
          <button 
            className={country._id === settings.badCountry ? "selected" : ""} 
            onClick={this.props.setBadCountry.bind(this, country._id)}>Bad Country
          </button>
        </div>
        <div className="action-buttons">
          <SaveItem {...this.props} item={country} type="Country" handleItemSave={this.props.handleItemSave.bind(this)}/>
          <DeleteItem {...this.props} item={country} type="Country" />
        </div>
      </div>
    )
  }
}