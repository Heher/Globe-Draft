import React from "react"
import { Link } from "react-router"

import Header from './Header'

export default class Layout extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchUsers()
  }

  render() {
    if (this.props.users.length === 0) {
      return (
        <div className="loading-screen"></div>
      )
    } else {
      const currentUser = this.props.users.filter((user) => {
        return user.selected
      })[0]

      const userDrafting = this.props.users.filter(user => {
        return user.draftNum === this.props.settings.userTurn
      })[0]

      const canDraft = currentUser ? this.props.settings.userTurn === currentUser.draftNum : ""

      const createProps = {
        ...this.props,
        currentUser,
        userDrafting,
        canDraft
      }

      return (
        <div>
          <Header {...this.props} currentUser={currentUser} userDrafting={userDrafting} canDraft={canDraft} />
          {React.cloneElement(this.props.children, createProps)}
        </div>
      )
    }
  }
}