import React from 'react'

import UserAddItemField from './UserAddItemField'
import UserPanelItem from './UserPanelItem'

export default class UserAdminSection extends React.Component {

  render() {
    const { dataStatus, users } = this.props
    let listItems = []
    if (dataStatus.usersReceived) {
      listItems = users.map((user, index) => {
        return <UserPanelItem {...this.props} key={index} user={user} />
      })
    } else {
      listItems = null
    }
    return (
      <div className="admin-section">
        <div>
          <div className="panel add-item">
            <UserAddItemField {...this.props} />
          </div>
        </div>
        {listItems}
      </div>
    )
  }
}