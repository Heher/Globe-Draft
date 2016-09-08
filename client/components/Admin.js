import React from 'react'

import UserAdminSection from './admin/users/UserAdminSection'
import RegionAdminSection from './admin/regions/RegionAdminSection'
import CountryAdminSection from './admin/countries/CountryAdminSection'
import SettingAdminSection from './admin/settings/SettingAdminSection'
import AdminSidebar from './AdminSidebar'

import '../css/admin.sass'
import '../css/admin/admin_container.sass'

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
    switch (type) {
      case 'User' :
        this.setState({ addingUser: !this.state.addingUser })
        break
      case 'Region' :
        this.setState({ addingRegion: !this.state.addingRegion })
        break
      case 'Country' :
        this.setState({ addingCountry: !this.state.addingCountry })
        break
      default :
        break
    }
  }

  render() {
    const { dataStatus, currentUser } = this.props

    return (
      <div className="admin-container">
        <AdminSidebar />
        {React.cloneElement(this.props.children, {...this.props})}
      </div>
    )
  }
}

Admin.propTypes = {
  dataStatus: React.PropTypes.object.isRequired,
  currentUser: React.PropTypes.object.isRequired
}

Admin.defaultProps = {
  dataStatus: {},
  currentUser: {}
}
