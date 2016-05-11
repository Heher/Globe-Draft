import React from "react";

import Avatar from "./Avatar";
import Flag from "./Flag";

export default class CountryCard extends React.Component {
  constructor() {
    super();
    this.selectCountry = this.selectCountry.bind(this);
    this.state = {
      available: true,
      selected: false
    }
  }

  selectCountry() {
    this.setState({
      available: true,
      selected: true
    });
  }

  get className() {
    if (this.state.selected) {
      return "selected";
    }
  }

  render() {
    return (
      <button className = {`countryCard ${this.className}`} onClick={this.selectCountry} >
        <Avatar user={this.props.owner}/>
        <Flag country={this.props.country}/>
      </button>
    )
  }
}