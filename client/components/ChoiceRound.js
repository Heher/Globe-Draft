import React from 'react'

require('../css/choice_round.sass')

export default class ChoiceRound extends React.Component {
  sortRound(round, roundNumber) {
    if (round.length) {
      return round.sort((a, b) => {
        if (roundNumber % 2 === 0) {
          return b.draftNum - a.draftNum
        }
        return a.draftNum - b.draftNum
      })
    }
    return null
  }

  render() {
    const { round, roundNumber } = this.props

    const roundCountries = round.length >= 2 ? this.sortRound(round, roundNumber) : round
    const renderCountries = roundCountries.map((country, index) => {
      return <li key={index} i={index}>{country.name} - avatar(this.props.users, country.userId)/></li>
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
