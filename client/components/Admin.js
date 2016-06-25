import React from "react"
import { Link } from 'react-router'

import AdminSection from './admin/AdminSection'
import AddItemField from './admin/AddItemField'
import EditEvent from './admin/EditEvent'
import Login from './Login'

import UserAdminSection from './admin/users/UserAdminSection'

require('../css/admin.sass')

export default class Admin extends React.Component {

  render() {
    const { dataStatus, users } = this.props

    if (dataStatus.usersReceived) {
      return (
        <div className="admin-panel">
          <h1>Admin Panel</h1>
          <h2>Users</h2>
          <UserAdminSection {...this.props} />
        </div>
      )
    } else {
      return (
        <Login {...this.props} />
      )
    }
  }
}

// <h2>Events</h2>
//           <AdminSection {...this.props} type="Event" items={this.props.events} />
//           <h2>Regions</h2>
//           <AdminSection {...this.props} type="Region" items={this.props.regions} />
//           <h2>Countries</h2>
//           <AdminSection {...this.props} type="Country" items={this.props.countries} />
//           <Link to='/countries'>Countries</Link>