import React from 'react'

import UserCard from './UserCard'

require('../css/round_status.sass')

export default class RoundStatus extends React.Component {
  sortUsers(users) {
    return users.sort(function(a, b) {
      return a.draftNum - b.draftNum
    })
  }

  render() {
    const sortedUsers = this.sortUsers(this.props.users.slice(0)) // Slice is used to not mutate original array
    const userCards = sortedUsers.map((user, index) => {
      const selected = user.draftNum === this.props.settings.userTurn
      return <UserCard key={index} selected={selected} user={user} />
    })

    return (
      <div className="round-status">
        <h2>Round {this.props.settings.round}</h2>
        <ul>
          {userCards}
        </ul>
      </div>
    )
  }
}