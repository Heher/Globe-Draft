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

  handleSelectChange(event) {
    this.setState({countryValue: event.target.value})
  }

  render() {
    const { type } = this.props

    let countryOptions = []

    countryOptions.push(<option value='' key={0}>Not Set</option>)
    this.props.countries.map((country, index) => {
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