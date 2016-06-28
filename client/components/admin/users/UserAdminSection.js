import React from 'react'
import classNames from 'classnames'

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

    const renderClasses = classNames({
      'show': this.props.addingUser
    })

    return (
      <div>
        <div className={`add-item ${renderClasses}`}>
          <UserAddItemField {...this.props} />
        </div>
        <div className="admin-section">
          {listItems}
        </div>
      </div>
    )
  }
}