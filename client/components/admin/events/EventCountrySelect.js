import React from 'react'

export default class EventCountrySelect extends React.Component {
  constructor(props) {
    super(props)
    if (this.props.country) {
      this.state = {
        countryValue: this.props.country._id
      }
    } else {
      this.state = {
        countryValue: ''
      }
    }
  }

  sortCountryOptions(countries) {
    if (countries.length) {
      return countries.sort(function(a, b) {
        if(a.name < b.name) return -1
        if(a.name > b.name) return 1
        return 0
      })
    } else {
      return null
    }
  }

  handleSelectChange(event) {
    this.setState({countryValue: event.target.value})
  }

  render() {
    const { type, countries } = this.props

    let countryOptions = []

    const sortedOptions = this.sortCountryOptions(countries)

    countryOptions.push(<option value='' key={0}>Not Set</option>)
    sortedOptions.map((country, index) => {
      countryOptions.push(<option key={index + 1} value={country._id}>{country.name}</option>)
    })
    return (
      <div>
        <span>&nbsp;</span>
        <select className={type} onChange={this.handleSelectChange.bind(this)} value={this.state.countryValue}>
          {countryOptions}
        </select>
      </div>
    )
  }
}