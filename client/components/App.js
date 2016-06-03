import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../actions/actionCreators'
import Layout from './Layout'

function mapStateToProps(state) {
  return{
    regions: state.regions,
    countries: state.countries,
    users: state.users,
    settings: state.settings
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

const App = connect(mapStateToProps, mapDispatchToProps)(Layout)

export default App