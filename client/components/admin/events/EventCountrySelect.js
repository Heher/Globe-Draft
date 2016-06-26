import React from 'react'

export default class EventCountrySelect extends React.Component {
  constructor(props) {
    super(props)
    if (this.props.country) {
      this.state = {
        countryValue: this.props.country._id
      }
    }
  }

  handleSelectChange(event) {
    console.log(event.target.value)
  }

  render() {
    const countryOptions = this.props.countries.map((country, index) => {
      return <option key={index} value={country._id}>{country.name}</option>
    })
    console.log(countryOptions)
    return (
      <select onChange={this.handleSelectChange.bind(this)} value={this.countryValue}>
        {countryOptions}
      </select>
    )
  }
}