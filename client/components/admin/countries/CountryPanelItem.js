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
      shortNameValue: this.props.country.shortName,
      regionValue: this.props.country.regionId
    }
  }

  handleInputChange(event) {
    this.setState({inputValue: event.target.value})
  }

  handleShortNameChange(event) {
    this.setState({shortNameValue: event.target.value})
  }

  handleSelectChange(event) {
    this.setState({regionValue: event.target.value})
  }

  handleItemSave() {
    this.props.editCountry(
      this.props.country._id,
      {
        name: this.state.inputValue,
        shortName: this.state.shortNameValue, 
        regionId: this.state.regionValue
      }
    )
  }

  findRegion(regionId) {
    return this.props.regions.find(propRegion => {
      return propRegion._id === regionId
    })
  }

  render() {
    const { country } = this.props

    if (country.editing) {
      return (
        <CountryPanelEdit 
          {...this.props} 
          country={country}
          inputValue={this.state.inputValue}
          shortNameValue={this.state.shortNameValue}
          regionValue={this.state.regionValue}
          handleInputChange={this.handleInputChange.bind(this)}
          handleShortNameChange={this.handleShortNameChange.bind(this)}
          handleSelectChange={this.handleSelectChange.bind(this)}
          handleItemSave={this.handleItemSave.bind(this)}
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