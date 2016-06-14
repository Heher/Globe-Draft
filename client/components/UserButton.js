import React from "react";

export default class UserButton extends React.Component {

  render() {
    const { user } = this.props
    const selected = user.selected ? "selected" : ""

    return (
      <button className={selected} onClick={this.props.changeUser.bind(null, user._id)}>{user.name}</button>
    )
  }
}