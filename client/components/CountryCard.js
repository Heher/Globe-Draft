import React from "react";

import Avatar from "./Avatar";
import Flag from "./Flag";

export default class CountryCard extends React.Component {

  render() {
    const { id, selected, name } = this.props.country
    const selectedClass = selected ? "selected" : ""
    const disabled = (!selected && this.props.regionCompleted) ? "disabled" : ""

    return (
      <button className = {`countryCard ${selectedClass} ${disabled}`} onClick={this.props.selectCountry.bind(null, this.props.region.id, id, !selected, disabled)} >
        <h3>{name}</h3>
        <Flag country={this.props.country}/>
      </button>
    )
  }
}