import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Admin from './Admin'

import * as userActions from '../actions/users'
import * as countryActions from '../actions/countries'
import * as settingActions from '../actions/settings'
import * as draftActions from '../actions/draft'
import * as actionCreators from '../actions/actionCreators'

const combinedActions = Object.assign(
  {},
  actionCreators,
  userActions,
  countryActions,
  settingActions,
  draftActions
)

function mapStateToProps(state) {
  return {
    regions: state.regions,
    countries: state.countries,
    users: state.users,
    events: state.events,
    currentUser: state.currentUser,
    settings: state.settings,
    dataStatus: state.dataStatus
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(combinedActions, dispatch)
}

const AdminContainer = connect(mapStateToProps, mapDispatchToProps)(Admin)

export default AdminContainer
