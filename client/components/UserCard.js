import React from 'react'

import UserCountryList from './UserCountryList'

require('../css/user_card.sass')

export default function UserCard(props) {
  const { user, selected } = props
  return (
    <li className={`user-card ${selected ? 'selected' : ''}`}>
      <h5 className="name">{user.name}{selected ? ' - Drafting' : ''}</h5>
      <UserCountryList {...props} user={user} />
    </li>
  )
}

UserCard.propTypes = {
  user: React.PropTypes.object.isRequired,
  selected: React.PropTypes.bool.isRequired
}
