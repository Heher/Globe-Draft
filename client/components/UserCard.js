import React from 'react'

import UserCountryList from './UserCountryList'

require('../css/user_card.sass')

export default class UserCard extends React.Component {
  render() {
    const { user, selected, position } = this.props
    return (
      <li className={`user-card ${selected ? 'selected' : ''}`}>
        <h5 className="name">{user.name}{selected ? ' - Drafting' : ''}</h5>
        <UserCountryList {...this.props} user={user} />
      </li>
    )
  }
}
