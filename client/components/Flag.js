import React from 'react'

import { spacesToDashes } from '../utilities/format'

export default class Flag extends React.Component {
  get countryImg() {
    if (this.props.country.name) {
      return require(`../img/flags/${spacesToDashes(this.props.country.name)}.png`)
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
