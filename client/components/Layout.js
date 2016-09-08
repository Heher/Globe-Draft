import React from 'react'

import Header from './Header'
import StatusBar from './StatusBar'

export default class Layout extends React.Component {
  componentDidMount() {
    this.props.fetchUsers()
    this.props.fetchEvents()
    this.props.fetchCountries()
    this.props.fetchRegions()
    this.props.fetchSettings()
  }

  render() {
    const { users, currentUser, dataStatus, settings, regions } = this.props

    if (dataStatus.usersReceived && dataStatus.eventsReceived && dataStatus.countriesReceived && dataStatus.regionsReceived && dataStatus.settingsReceived) {
      const userDrafting = users.find(user => user.draftNum === settings.userTurn)

      let canDraft = false
      let draftComplete = false
      let totalDraftRounds = 0

      regions.forEach(region => {
        totalDraftRounds = totalDraftRounds + region.maxCountriesSelected
      })

      if (settings.round > totalDraftRounds) {
        draftComplete = true
      }

      if (currentUser._id && currentUser.hasPaid) {
        if ((settings.userTurn === currentUser.draftNum) && (settings.round <= totalDraftRounds) && (settings.draftStarted)) {
          canDraft = true
        }
      }

      const paidUsers = users.filter(user => user.hasPaid)

      const createProps = {
        userDrafting,
        canDraft,
        draftComplete,
        totalDraftRounds,
        paidUsers,
        ...this.props
      }

      return (
        <div>
          <Header
            {...this.props}
            userDrafting={userDrafting}
            canDraft={canDraft}
            draftComplete={draftComplete}
            paidUsers={paidUsers}
          />
          <StatusBar {...this.props} />
          <div className="page">
            <div className="content">
              {this.props.children}
            </div>
          </div>
        </div>
      )
    }
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

Layout.propTypes = {
  children: React.PropTypes.node,
  fetchUsers: React.PropTypes.func.isRequired,
  fetchEvents: React.PropTypes.func.isRequired,
  fetchCountries: React.PropTypes.func.isRequired,
  fetchRegions: React.PropTypes.func.isRequired,
  fetchSettings: React.PropTypes.func.isRequired,
  users: React.PropTypes.array.isRequired,
  currentUser: React.PropTypes.object.isRequired,
  dataStatus: React.PropTypes.object.isRequired,
  settings: React.PropTypes.object.isRequired,
  regions: React.PropTypes.array.isRequired
}
