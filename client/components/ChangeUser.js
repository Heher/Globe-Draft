import React from "react";
import UserButton from './UserButton'

export default class ChangeUser extends React.Component {

  render() {

    const userButtons = this.props.users.map((user, index) => {
      return <UserButton {...this.props} key={index} i={index} user={user} />
    })

    return (
      <div className="change-user">
        {userButtons}
      </div>
    )
  }
}