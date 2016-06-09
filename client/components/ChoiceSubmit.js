import React from 'react'
import classNames from 'classnames'

require('../css/submit_button.sass')

export default class ChoiceSubmit extends React.Component {

  render() {

    const selectedCountry = this.props.selectedCountry[0]

    const lastOfRound = (this.props.settings.numberDrafted === (this.props.users.length - 1))

    const buttonClasses = classNames({
      'show': selectedCountry
    })

    return (
      <button className={`choice-submit ${buttonClasses}`} onClick={this.props.draftCountry.bind(null, selectedCountry, this.props.currentUser.id, this.props.settings.round, lastOfRound)}>Draft Country</button>
    )
  }

}