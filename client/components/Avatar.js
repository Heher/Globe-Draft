import React from "react";

export default class Avatar extends React.Component {
  render() {
    const name = this.props.users.map((user, index) => {
      if (user.id === this.props.userId) {
        return user.name
      }
    })
    return (
      <p className="avatar">{name}</p>
    )
  }
}