import React from 'react'

import UserCard from './UserCard'

require('../css/round_status.sass')

export default class RoundStatus extends React.Component {
  sortUsers(users) {
    return users.sort((a, b) => a.draftNum - b.draftNum)
  }

  render() {
    const { draftComplete, settings, paidUsers } = this.props

    const sortedUsers = this.sortUsers(paidUsers.slice(0)) // Slice is used to not mutate original array
    const userCards = sortedUsers.map((user, index) => {
      const selected = ((user.draftNum === settings.userTurn) && settings.draftStarted && !draftComplete)
      return (
        <UserCard
          key={index}
          {...this.props}
          position={index + 1}
          selected={selected}
          user={user}
        />
      )
    })

    return (
      <div className="round-status">
        <h2>{draftComplete || !settings.draftStarted ? 'Drafts' : `Round ${settings.round}`}</h2>
        <ul>
          {userCards}
        </ul>
      </div>
    )
  }
}

RoundStatus.propTypes = {
  draftComplete: React.PropTypes.bool.isRequired,
  settings: React.PropTypes.object.isRequired,
  paidUsers: React.PropTypes.array.isRequired
}
