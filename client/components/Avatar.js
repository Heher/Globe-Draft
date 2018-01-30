import React from 'react'

require('../css/avatar.sass')

export default function Avatar(props) {
  const foundUsers = props.countryDrafts.map(draft => {
    const user = props.users.find(user => user._id === draft.userId)
    return user.name
  })

  if (foundUsers) {
    const avatars = foundUsers.join(', ')

    return (
      <span className="avatar">
        {avatars}
      </span>
    )
  }
  return null
}

Avatar.propTypes = {
  users: React.PropTypes.array.isRequired,
  countryDrafts: React.PropTypes.array.isRequired
}
