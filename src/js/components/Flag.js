import React from "react";

export default class Flag extends React.Component {
  render() {
    return (
      <img className="flag" src={`img/flags/${this.props.country.name}.png`} />
    )
  }
}