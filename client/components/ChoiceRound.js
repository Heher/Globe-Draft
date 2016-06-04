import React from 'react'

import Avatar from './Avatar'

export default class ChoiceRound extends React.Component {
  sortRound(round, roundNumber) {
    // console.log(round.length, roundNumber)
    if (round.length) {
      return round.sort(function(a, b) {
        if (roundNumber % 2 === 0) {
          return b.userId - a.userId
        }
        return a.userId - b.userId
      })
    } else {
      return null
    }
  }

  render() {
    const { round, roundNumber } = this.props

    const roundCountries = round.length >= 2 ? this.sortRound(round, roundNumber) : round
    const renderCountries = roundCountries.map((country, index) => {
      return <li key={index} i={index}>{country.name} - <Avatar {...this.props} userId={country.userId}/></li>
    })
    return (
      <div>
        {roundCountries.length >= 1 ? <h5>Round {this.props.roundNumber}</h5> : null}
        <ul>
          {renderCountries}
        </ul>
      </div>
    )
  }
}