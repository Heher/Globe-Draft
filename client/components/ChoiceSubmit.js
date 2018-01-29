import React from 'react'
import classNames from 'classnames'

require('../css/submit_button.sass')

export default class ChoiceSubmit extends React.Component {
  render() {
    const { selectedCountry, settings, users } = this.props
    const { drafts } = this.props.country
    const lastOfRound = (settings.numberDrafted === (users.length - 1))
    const buttonClasses = classNames({
      show: selectedCountry
    })

    const newDrafts = drafts ? [...drafts] : []
    newDrafts.push({
      userId: this.props.currentUser._id,
      round: this.props.settings.round
    })

    return (
      <button
        className={`choice-submit ${buttonClasses}`}
        onClick={() => {
          this.props.draftCountry({
            country: selectedCountry,
            userId: this.props.currentUser._id,
            round: settings.round,
            draftNum: this.props.currentUser.draftNum
          })
        }}
      >Confirm</button>
    )
  }
}

ChoiceSubmit.propTypes = {
  draftCountry: React.PropTypes.func.isRequired,
  selectedCountry: React.PropTypes.object.isRequired,
  settings: React.PropTypes.object.isRequired,
  users: React.PropTypes.array.isRequired,
  currentUser: React.PropTypes.object.isRequired
}
