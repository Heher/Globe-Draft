import React from "react"

import CountryItem from './CountryItem'

require('../css/country_list.sass')

export default class CountryList extends React.Component {

  render() {
    let countries = []
    for (let round = 1; round <= this.props.totalDraftRounds; round++) {
      countries.push(<CountryItem {...this.props} key={round} round={round} />)
    }

    return (
      <div className="country-list">
        <h2>Your Countries</h2>
        <ul>
          {countries}
        </ul>
      </div>
    )
  }
}