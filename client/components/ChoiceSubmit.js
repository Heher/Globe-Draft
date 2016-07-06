import React from 'react'
import classNames from 'classnames'

require('../css/submit_button.sass')

export default class ChoiceSubmit extends React.Component {

  render() {

    const { selectedCountry } = this.props

    const lastOfRound = (this.props.settings.numberDrafted === (this.props.users.length - 1))

    const buttonClasses = classNames({
      'show': selectedCountry
    })

    return (
      <button
        className={`choice-submit ${buttonClasses}`}
        onClick={this.props.draftCountry.bind(null, selectedCountry, {
          userId: this.props.currentUser._id,
          round: this.props.settings.round,
          draftNum: this.props.currentUser.draftNum, 
          lastOfRound,
          userTurn: this.props.settings.userTurn,
          numberDrafted: this.props.settings.numberDrafted
        })}>Draft Country</button>
    )
  }

}