import React from 'react'

import PanelButtons from '../panel/PanelButtons'
import DraftNumber from './DraftNumber'
import CancelEdit from '../panel/buttons/CancelEdit'
import DeleteItem from '../panel/buttons/DeleteItem'
import SaveItem from '../panel/buttons/SaveItem'

require('../../../css/admin/users/user_section.sass')

export default class UserPanelEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: this.props.user.email,
      idToken: this.props.user.id_token
    }
  }

  handleTokenChange(event) {
    this.setState({idToken: event.target.value})
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value})
  }

  render() {
    const { user } = this.props

    return (
      <div className="user editing">
        <div className="title">
          <input 
            type="text"
            onChange={this.props.handleInputChange.bind(this)}
            value={this.props.inputValue}
          />
          <CancelEdit {...this.props} item={user} type="User" />
        </div>
        <div className="paid-checkbox">
          <p>Has Paid:</p>
          <input
            type="checkbox"
            checked={this.props.paidCheckboxValue ? "checked" : ""}
            onChange={this.props.handlePaidCheckboxChange.bind(this)}
          />
        </div>
        <div className="admin-checkbox">
          <p>Make Admin:</p>
          <input
            type="checkbox"
            checked={this.props.checkboxValue ? "checked" : ""}
            onChange={this.props.handleCheckboxChange.bind(this)}
          />
        </div>
        <p>Email: <input
          className="admin-email"
          type="text"
          onChange={this.handleEmailChange.bind(this)}
          value={this.state.email}
        /></p>
        <DraftNumber {...this.props} user={user} />
        <p>Token: <input
          className="admin-token"
          type="text"
          onChange={this.handleTokenChange.bind(this)}
          value={this.state.idToken}
        /></p>
        <div className="action-buttons">
          <SaveItem {...this.props} item={user} type="User" handleItemSave={this.props.handleItemSave.bind(this)}/>
          <DeleteItem {...this.props} item={user} type="User" />
        </div>
      </div>
    )
  }
}