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
    this.props.fetchSettings()
  }

  render() {
    const { users, currentUser, dataStatus } = this.props

    if (dataStatus.usersReceived && dataStatus.settingsReceived) {
      const userDrafting = this.props.users.filter(user => {
        return user.draftNum === this.props.settings.userTurn
      })[0]

      const canDraft = currentUser ? this.props.settings.userTurn === currentUser.draftNum : false

      const createProps = {
        ...this.props,
        userDrafting,
        canDraft
      }

      return (
        <div>
          <Header {...this.props} userDrafting={userDrafting} canDraft={canDraft} />
          {React.cloneElement(this.props.children, createProps)}
        </div>
      )
    } else {
      return (
        <div>
          <Header {...this.props} />
          <h2>Loading</h2>
        </div>
      )
    }
  }
}