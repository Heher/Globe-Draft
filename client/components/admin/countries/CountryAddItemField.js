import React from 'react'

import CountryRegionSelect from './CountryRegionSelect'

import '../../../css/admin/add_item.sass'

export default class CountryAddItemField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      regionValue: ''
    }
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  handleSelectChange(event) {
    this.setState({ regionValue: event.target.value })
  }

  handleFormSubmit(event) {
    event.preventDefault()
    const countryName = event.target.getElementsByClassName('country-name')[0]
    const countryShortName = event.target.getElementsByClassName('country-short-name')[0]
    const countryNameValue = countryName.value
    const countryShortNameValue = countryShortName.value
    this.props.addCountry(countryNameValue, countryShortNameValue, this.state.regionValue)
    countryName.value = ''
    countryShortName.value = ''
  }

  render() {
    return (
      <form className="add-item" onSubmit={event => this.handleFormSubmit(event)}>
        <h4>Add Country:</h4>
        <input className="country-name" type="text" />
        <input className="country-short-name" type="text" />
        <CountryRegionSelect
          {...this.props}
          handleSelectChange={this.handleSelectChange}
          regionValue={this.state.regionValue}
        />
        <button type="submit">SUBMIT</button>
      </form>
    )
  }
}

CountryAddItemField.propTypes = {
  addCountry: React.PropTypes.func.isRequired
}
