import React from 'react'

import Avatar from './Avatar'

require('../css/choice_round.sass')

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
      <div className="choice-round">
        {roundCountries.length >= 1 ? <h4>Round {this.props.roundNumber}</h4> : null}
        <ul>
          {renderCountries}
        </ul>
      </div>
    )
  }
}