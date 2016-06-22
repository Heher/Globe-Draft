import React from "react"
import { Link } from "react-router"

import Header from './Header'
import AdminSection from './admin/AdminSection'

export default class Layout extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchUsers()
    this.props.fetchEvents()
    this.props.fetchCountries()
    this.props.fetchRegions()
  }

  render() {
    const currentUser = this.props.users[0]

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
    
    if (currentUser) {
      return (
        <div>
          <Header {...this.props} currentUser={currentUser} userDrafting={userDrafting} canDraft={canDraft} />
          {React.cloneElement(this.props.children, createProps)}
        </div>
      )
    } else {
      return (
        <div>
          <h1>No Users</h1>
          <AdminSection {...this.props} type="User" items={this.props.users} />
        </div>
      )
    }
  }
}