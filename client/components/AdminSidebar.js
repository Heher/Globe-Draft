import React from 'react'
import { Link } from 'react-router'

import '../css/admin/sidebar.sass'

export default class AdminSidebar extends React.Component {
  render() {
    return (
      <div className="admin-sidebar">
        <h2>Sidebar</h2>
        <Link to="/admin/users" activeClassName="active">Users</Link>
        <Link to="/admin/regions" activeClassName="active">Regions</Link>
        <Link to="/admin/countries" activeClassName="active">Countries</Link>
      </div>
    )
  }
}
