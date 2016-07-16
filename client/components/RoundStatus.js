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
    const { draftComplete, settings } = this.props

    const sortedUsers = this.sortUsers(this.props.users.slice(0)) // Slice is used to not mutate original array
    const userCards = sortedUsers.map((user, index) => {
      const selected = ((user.draftNum === this.props.settings.userTurn) && settings.draftStarted && !draftComplete)
      return <UserCard key={index} {...this.props} position={index + 1} selected={selected} user={user} />
    })

    return (
      <div className="round-status">
        <h2>{draftComplete || !settings.draftStarted ? "Drafts" : `Round ${this.props.settings.round}`}</h2>
        <ul>
          {userCards}
        </ul>
      </div>
    )
  }
}