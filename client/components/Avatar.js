import React from 'react'

require('../css/avatar.sass')

export default function avatar(users, userId) {
  const foundUser = users.find(user => user._id === userId)

  return (
    <span className="avatar">{foundUser.name}</span>
  )
}
