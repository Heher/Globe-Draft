import React from 'react'

require('../css/avatar.sass')

export default function Avatar(props) {
  const foundUser = props.users.find(user => user._id === props.userId)

  return (
    <span className="avatar">{foundUser.name}</span>
  )
}

Avatar.propTypes = {
  users: React.PropTypes.array.isRequired,
  userId: React.PropTypes.string.isRequired
}
