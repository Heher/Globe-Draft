import React from "react";

import Avatar from "./Avatar";
import Flag from "./Flag";

export default class CountryCard extends React.Component {

  render() {
    const userId = this.props.currentUser.id
    const { id, selected, name } = this.props.country
    const selectedClass = (this.props.country.userId === userId) ? "selected" : ""
    const disabled = (!selected && this.props.regionCompleted || (this.props.country.userId && this.props.country.userId !== userId)) ? "disabled" : ""

    if (selected) {
      return (
        <button className = {`countryCard ${selectedClass} ${disabled}`} onClick={this.props.deselectingCountry.bind(null, this.props.region.id, id, userId, disabled)} >
          <h3>{name}</h3>
          <Flag country={this.props.country}/>
        </button>
      )
    } else {
      return (
        <button className = {`countryCard ${selectedClass} ${disabled}`} onClick={this.props.selectingCountry.bind(null, this.props.region.id, id, userId, disabled)} >
          <h3>{name}</h3>
          <Flag country={this.props.country}/>
        </button>
      )
    }
  }
}