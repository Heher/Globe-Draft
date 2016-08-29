import React from 'react'

export default class Flag extends React.Component {
  spacesToDashes(country) {
    return country.replace(/\s+/g, '-')
  }

  get countryImg() {
    if (this.props.country.name) {
      return require(`../img/flags/${this.spacesToDashes(this.props.country.name)}.png`)
    }
    return null
  }

  render() {
    return (
      <img className="flag" src={this.countryImg} alt={`Flag of ${this.props.country.name}`} />
    )
  }
}
