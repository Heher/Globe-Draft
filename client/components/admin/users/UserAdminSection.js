import React from 'react'
import classNames from 'classnames'

import UserAddItemField from './UserAddItemField'
import UserPanelItem from './UserPanelItem'

export default class UserAdminSection extends React.Component {

  sortUsers(users) {
    if (users.length) {
      return users.sort(function(a, b) {
        if(a.draftNum < b.draftNum) return -1
        if(a.draftNum > b.draftNum) return 1
        return 0
      })
    } else {
      return null
    }
  }
  
  render() {
    const { dataStatus, users } = this.props
    let listItems = []
    if (dataStatus.usersReceived) {
      const sortedUsers = this.sortUsers(users)
      listItems = sortedUsers.map((user, index) => {
        return <UserPanelItem {...this.props} key={index} user={user} />
      })
    } else {
      listItems = null
    }

    const renderClasses = classNames({
      'show': this.props.addingUser
    })

    return (
      <div>
        <div className={`add-item ${renderClasses}`}>
          <UserAddItemField {...this.props} />
        </div>
        <div className="users-section">
          {listItems}
        </div>
      </div>
    )
  }
}