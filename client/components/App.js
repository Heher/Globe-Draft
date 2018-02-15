import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActions from '../actions/users'
import * as countryActions from '../actions/countries'
import * as settingActions from '../actions/settings'
import * as draftActions from '../actions/draft'
import * as draftsActions from '../actions/drafts'
import * as regionActions from '../actions/regions'
import * as sportActions from '../actions/sports'
import * as medalActions from '../actions/medals'
import * as actionCreators from '../actions/actionCreators'
import Layout from './Layout'

const combinedActions = Object.assign(
  {},
  actionCreators,
  userActions,
  countryActions,
  settingActions,
  draftActions,
  draftsActions,
  regionActions,
  sportActions,
  medalActions
)

function mapStateToProps(state) {
  return {
    regions: state.regions,
    countries: state.countries,
    users: state.users,
    events: state.events,
    currentUser: state.currentUser,
    settings: state.settings,
    drafts: state.drafts,
    sports: state.sports,
    medals: state.medals,
    dataStatus: state.dataStatus
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(combinedActions, dispatch)
}

const App = connect(mapStateToProps, mapDispatchToProps)(Layout)

export default App
