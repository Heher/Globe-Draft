import React from 'react'

import PanelButtons from '../panel/PanelButtons'

export default class UserPanelInfo extends React.Component {
  render() {
    const { user } = this.props

    return (
      <div className="panel">
        <p>{user.name} - {user.draftNum}</p>
        <PanelButtons {...this.props} item={user} type="User" editing={user.editing} />
      </div>
    )
  }
}