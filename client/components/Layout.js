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
    const { users, currentUser, dataStatus, settings, regions } = this.props

    if (dataStatus.usersReceived && dataStatus.eventsReceived && dataStatus.countriesReceived && dataStatus.regionsReceived && dataStatus.settingsReceived ) {
      const userDrafting = this.props.users.filter(user => {
        return user.draftNum === this.props.settings.userTurn
      })[0]

      let canDraft = false
      let draftComplete = false
      let totalDraftRounds = 0

      regions.map(region => {
        totalDraftRounds = totalDraftRounds + region.maxCountriesSelected
      })

      if (settings.round > totalDraftRounds) {
        draftComplete = true
      }

      if (currentUser._id) {
        if ((settings.userTurn === currentUser.draftNum) && (settings.round <= totalDraftRounds) && (settings.draftStarted)) {
          canDraft = true
        }
      }

      const createProps = {
        ...this.props,
        userDrafting,
        canDraft,
        draftComplete,
        totalDraftRounds
      }

      return (
        <div>
          <Header {...this.props} userDrafting={userDrafting} canDraft={canDraft} />
          <div className="page">
            <div className="content">
              {React.cloneElement(this.props.children, createProps)}
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <Header {...this.props} />
          <div className="page">
            <div className="content">
              <h2>Loading</h2>
            </div>
          </div>
        </div>
      )
    }
  }
}