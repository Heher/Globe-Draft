import React from 'react'

export default class CountrySelect extends React.Component {
  render() {
    const countryOptions = this.props.countries.map((country, index) => {
      return <option key={index} value={country._id}>{country.name}</option>
    })
    return (
      <select onChange={this.props.handleSelectChange.bind(this)} value={this.props.goldSelectValue}>
        {countryOptions}
      </select>
    )
  }
}