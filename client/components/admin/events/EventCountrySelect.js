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
    this.setState({countryValue: event.target.value})
  }

  render() {
    const { type } = this.props
    
    const countryOptions = this.props.countries.map((country, index) => {
      return <option key={index} value={country._id}>{country.name}</option>
    })
    return (
      <select className={type} onChange={this.handleSelectChange.bind(this)} value={this.countryValue}>
        {countryOptions}
      </select>
    )
  }
}