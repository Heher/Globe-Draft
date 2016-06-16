import React from 'react'

require('../css/user_card.sass')

export default class UserCard extends React.Component {
  render() {
    const { user, selected } = this.props
    return (
      <li className={`user-card ${selected ? "selected" : ""}`}>{user.name}</li>
    )
  }
}