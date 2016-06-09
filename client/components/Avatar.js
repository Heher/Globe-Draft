import React from "react"

require('../css/avatar.sass')

export default class Avatar extends React.Component {
  render() {
    const name = this.props.users.map((user, index) => {
      if (user.id === this.props.userId) {
        return user.name
      }
    })
    return (
      <span className="avatar">{name}</span>
    )
  }
}