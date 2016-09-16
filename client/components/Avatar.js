import React from 'react'

require('../css/avatar.sass')

export default function Avatar(props) {
  const { users, userId } = props

  const foundUser = users.find(user => user._id === userId)

  return (
    <span className="avatar">{foundUser.name}</span>
  )
}
