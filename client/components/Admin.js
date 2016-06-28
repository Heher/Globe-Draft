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

require('../css/admin.sass')

export default class Admin extends React.Component {

  render() {
    const { dataStatus, currentUser } = this.props

    if (dataStatus.usersReceived && dataStatus.eventsReceived && dataStatus.countriesReceived && dataStatus.regionsReceived && currentUser.isAdmin) {
      return (
        <div className="admin-panel">
          <h1>Admin Panel</h1>
          <h2>Users</h2>
          <UserAdminSection {...this.props} />
          <h2>Events</h2>
          <EventAdminSection {...this.props} />
          <h2>Regions</h2>
          <RegionAdminSection {...this.props} />
          <h2>Countries</h2>
          <CountryAdminSection {...this.props} />
        </div>
      )
    } else {
      return (
        <Login {...this.props} />
      )
    }
  }
}