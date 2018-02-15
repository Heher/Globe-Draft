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
    this.props.fetchDrafts()
    this.props.fetchSports()
    this.props.fetchMedals()
  }

  render() {
    const { users, currentUser, dataStatus, settings, regions, drafts } = this.props

    if (dataStatus.usersReceived && dataStatus.eventsReceived && dataStatus.countriesReceived && dataStatus.regionsReceived && dataStatus.settingsReceived && dataStatus.draftsReceived && dataStatus.medalsReceived) {
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
      const userCountries = drafts.filter(draft => draft.userId === currentUser._id)

      const createProps = {
        userDrafting,
        canDraft,
        draftComplete,
        totalDraftRounds,
        paidUsers,
        userCountries,
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
              {React.cloneElement(this.props.children, createProps)}
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
  fetchDrafts: React.PropTypes.func.isRequired,
  users: React.PropTypes.array.isRequired,
  currentUser: React.PropTypes.object.isRequired,
  dataStatus: React.PropTypes.object.isRequired,
  settings: React.PropTypes.object.isRequired,
  regions: React.PropTypes.array.isRequired,
  drafts: React.PropTypes.array.isRequired
}
