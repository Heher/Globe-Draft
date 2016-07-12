import React from "react"
import { Link } from 'react-router'

import AdminSection from './admin/AdminSection'
import AddItemField from './admin/AddItemField'
import EditEvent from './admin/EditEvent'
import Login from './Login'

import UserAdminSection from './admin/users/UserAdminSection'
import EventAdminSection from './admin/events/EventAdminSection'
import RegionAdminSection from './admin/regions/RegionAdminSection'
import CountryAdminSection from './admin/countries/CountryAdminSection'
import SettingAdminSection from './admin/settings/SettingAdminSection'

require('../css/admin.sass')

export default class Admin extends React.Component {
  constructor() {
    super()
    this.state = {
      addingUser: false,
      addingEvent: false,
      addingRegion: false,
      addingCountry: false
    }
  }

  showAddItemPanel(type) {
    switch(type) {
      case "User" :
        this.setState({addingUser: !this.state.addingUser})
        break
      case "Event" :
        this.setState({addingEvent: !this.state.addingEvent})
        break
      case "Region" :
        this.setState({addingRegion: !this.state.addingRegion})
        break
      case "Country" :
        this.setState({addingCountry: !this.state.addingCountry})
        break
      default :
        ""
    }
  }

  render() {
    const { dataStatus, currentUser } = this.props

    if (dataStatus.usersReceived && dataStatus.eventsReceived && dataStatus.countriesReceived && dataStatus.regionsReceived && dataStatus.settingsReceived && currentUser.isAdmin) {
      return (
        <div className="page">
          <div className="content">
            <div className="admin-panel">
              <h1>Admin Panel</h1>
              <h2>Users</h2><span onClick={this.showAddItemPanel.bind(this, "User")}>+</span>
              <UserAdminSection {...this.props} addingUser={this.state.addingUser} />
              <h2>Events</h2><span onClick={this.showAddItemPanel.bind(this, "Event")}>+</span>
              <EventAdminSection {...this.props} addingEvent={this.state.addingEvent} />
              <h2>Regions</h2><span onClick={this.showAddItemPanel.bind(this, "Region")}>+</span>
              <RegionAdminSection {...this.props} addingRegion={this.state.addingRegion} />
              <h2>Countries</h2><span onClick={this.showAddItemPanel.bind(this, "Country")}>+</span>
              <CountryAdminSection {...this.props} addingCountry={this.state.addingCountry} />
              <h2>Settings</h2>
              <SettingAdminSection {...this.props} />
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <h2>Not Allowed</h2>
      )
    }
  }
}