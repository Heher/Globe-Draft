import React from 'react'
import ReactDOM from 'react-dom'

import CountryPanelEdit from './CountryPanelEdit'
import CountryPanelInfo from './CountryPanelInfo'
import PanelButtons from '../panel/PanelButtons'

export default class CountryPanelItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: this.props.country.name,
      regionValue: this.props.country.regionId
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleItemSave = this.handleItemSave.bind(this)
  }

  handleInputChange(event) {
    this.setState({inputValue: event.target.value})
  }

  handleSelectChange(event) {
    this.setState({regionValue: event.target.value})
  }

  handleItemSave() {
    this.props.editCountry(
      this.props.country._id,
      {name: this.state.inputValue, regionId: this.state.regionValue}
    )
  }

  findRegion(regionId) {
    return this.props.regions.filter(propRegion => {
      return propRegion._id === regionId
    })[0]
  }

  render() {
    const { country } = this.props

    if (country.editing) {
      return (
        <CountryPanelEdit 
          {...this.props} 
          country={country}
          inputValue={this.state.inputValue}
          regionValue={this.state.regionValue}
          handleInputChange={this.handleInputChange}
          handleSelectChange={this.handleSelectChange}
          handleItemSave={this.handleItemSave}
          region={this.findRegion(country.regionId)}
        />
      )
    } else {
      return (
        <CountryPanelInfo 
          {...this.props}
          country={country}
          region={this.findRegion(country.regionId)}
        />
      )
    }
  }
}