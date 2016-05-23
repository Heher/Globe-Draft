import React from "react";

import Avatar from "./Avatar";
import Flag from "./Flag";

export default class CountryCard extends React.Component {

  render() {
    const currentUserId = this.props.currentUser.id
    const { id, selected, name, userId } = this.props.country

    const available = userId || this.props.regionCompleted ? false : true
    const ownedByCurrentUser = (currentUserId === userId) ? true : false

    const disabled = !available && !ownedByCurrentUser ? true : false

    const canBeChanged = available || ownedByCurrentUser ? true : false

    const ownedClass = userId && !ownedByCurrentUser ? "owned" : ""
    const selectedClass = ownedByCurrentUser ? "selected" : ""
    const disabledClass = disabled ? "disabled" : ""

    if (selected) {
      return (
        <button className = {`countryCard ${ownedClass} ${selectedClass} ${disabledClass}`} onClick={this.props.deselectingCountry.bind(null, this.props.region.id, id, userId, !canBeChanged)} >
          <Flag country={this.props.country}/><h3>{name}</h3>
        </button>
      )
    } else {
      return (
        <button className = {`countryCard ${ownedClass} ${selectedClass} ${disabledClass}`} onClick={this.props.selectingCountry.bind(null, this.props.region.id, id, currentUserId, !canBeChanged)} >
          <Flag country={this.props.country}/><h3>{name}</h3>
        </button>
      )
    }
  }
}