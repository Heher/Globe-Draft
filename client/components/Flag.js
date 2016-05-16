import React from "react"

export default class Flag extends React.Component {
  spacesToDashes(country) {
    return country.replace(/\s+/g, '-')
  }

  get countryImg() {
    return require('../img/flags/' + this.spacesToDashes(this.props.country.name) + '.png')
  }

  render() {
    return (
      <img className="flag" src={this.countryImg} />
    )
  }
}