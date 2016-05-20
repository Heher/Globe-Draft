import React from "react";

export default class UserButton extends React.Component {

  render() {
    const selected = this.props.user.selected ? "selected" : ""

    return (
      <button className={selected} onClick={this.props.changeUser.bind(null, this.props.user.id)}>{this.props.user.name}</button>
    )
  }
}