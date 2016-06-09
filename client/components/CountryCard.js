import React from 'react'
import classNames from 'classnames'

import Avatar from './Avatar'
import Flag from './Flag'

require('../css/country.sass')

export default class CountryCard extends React.Component {

  constructor(props) {
    super(props)
  }

  countryIsOwned(userId) {
    return userId ? true : false
  }

  userOwnsCountry(countryUserId, currentUserId) {
    return countryUserId === currentUserId
  }

  handleClick(canDraft, canBeDeselected, canBeSelected) {
    if (!canDraft) {
      return null
    }
    if (canBeDeselected) {
      this.deselect(this.props.region.id, this.props.country.id, this.props.currentUser.id)
    } else if (canBeSelected) {
      this.select(this.props.region.id, this.props.country.id, this.props.currentUser.id)
    }
  }

  select(region, country, user) {
    this.props.selectCountry(region, country, user)
  }

  deselect(region, country, user) {
    this.props.deselectCountry(region, country, user)
  }

  render() {
    const { id, name, userId, selected, drafted } = this.props.country
    const { canDraft, regionCompleted } = this.props
    const currentUserId = this.props.currentUser.id

    const renderClasses = classNames({
      'owned': (currentUserId === userId) && drafted,
      'taken': (currentUserId !== userId) && drafted,
      'disabled': (currentUserId !== userId) && !selected && regionCompleted,
      'selected': (currentUserId === userId) && selected,
      'waitingTurn': !canDraft
    })

    const canBeSelected = !userId && !regionCompleted
    const canBeDeselected = (currentUserId === userId) && selected

    const needsAvatar = (currentUserId !== userId) && drafted


    return (
      <button 
        className = {`countryCard ${renderClasses}`}
        onClick={this.handleClick.bind(this, canDraft, canBeDeselected, canBeSelected)}
      >
        <Flag country={this.props.country}/><h3>{name}</h3>
        {needsAvatar ? <Avatar {...this.props} userId={userId}/> : null}
      </button>
    )
  }
}