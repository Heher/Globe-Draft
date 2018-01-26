import React from 'react'

import UserAdminSection from './admin/users/UserAdminSection'
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

    if (dataStatus.usersReceived &&
      dataStatus.eventsReceived &&
      dataStatus.countriesReceived &&
      dataStatus.regionsReceived &&
      dataStatus.settingsReceived &&
      dataStatus.draftsReceived &&
      currentUser.isAdmin
    ) {
      return (
        <div className="page">
          <div className="content">
            <div className="admin-panel">
              <h1>Admin Panel</h1>
              <h2>Users</h2><span onClick={() => this.showAddItemPanel('User')}>+</span>
              <UserAdminSection {...this.props} addingUser={this.state.addingUser} />
              <h2>Regions</h2><span onClick={() => this.showAddItemPanel('Region')}>+</span>
              <RegionAdminSection {...this.props} addingRegion={this.state.addingRegion} />
              <h2>Countries</h2><span onClick={() => this.showAddItemPanel('Country')}>+</span>
              <CountryAdminSection {...this.props} addingCountry={this.state.addingCountry} />
              <h2>Settings</h2>
              <SettingAdminSection {...this.props} />
            </div>
          </div>
        </div>
      )
    }
    return (
      <h2>Not Allowed</h2>
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
