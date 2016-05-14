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
    };
  }

  selectCountry() {
    this.setState({ selected: !this.state.selected });
  }

  get selectedClassName() {
    return this.state.selected ? "selected" : "";
  }

  render() {
    return (
      <button className = {`countryCard ${this.selectedClassName}`} onClick={this.selectCountry} >
        <h3>{this.props.country.name}</h3>
        <Avatar user={this.props.owner}/>
        <Flag country={this.props.country}/>
      </button>
    )
  }
}