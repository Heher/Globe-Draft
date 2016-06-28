import React from 'react'

import CountryRegionSelect from './CountryRegionSelect'

export default class CountryAddItemField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      regionValue: ''
    }
  }

  handleSelectChange(event) {
    this.setState({regionValue: event.target.value})
  }

  handleFormSubmit(event) {
    event.preventDefault()
    const input = event.target.getElementsByTagName('input')[0]
    let inputValue = input.value
    this.props.addCountry(inputValue, this.state.regionValue)
    input.value = ""
  }

  render() {
    return (
      <form onSubmit={event => this.handleFormSubmit(event)}>
        <h4>Add Country:</h4>
        <input type="text" />
        <CountryRegionSelect 
          {...this.props}
          handleSelectChange={this.handleSelectChange.bind(this)}
          regionValue={this.state.regionValue}
        />
        <button type="submit">SUBMIT</button>
      </form>
    )
  }
}