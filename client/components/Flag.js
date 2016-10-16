import React from 'react'

export default class Flag extends React.Component {
  spacesToDashes(countryName) {
    return countryName.replace(/\s+/g, '-')
  }

  get countryImg() {
    if (this.props.country.name) {
      return require(`../img/flags/${this.spacesToDashes(this.props.country.name)}.png`)
    }
    return require(`../img/flags/Unknown.png`)
  }

  render() {
    return (
      <img className="flag" src={this.countryImg} alt={`Flag of ${this.props.country.name}`} />
    )
  }
}

Flag.propTypes = {
  country: React.PropTypes.object.isRequired
}
