import React from 'react'

import PanelButtons from '../panel/PanelButtons'
import DraftNumber from './DraftNumber'
import CancelEdit from '../panel/buttons/CancelEdit'
import DeleteItem from '../panel/buttons/DeleteItem'
import SaveItem from '../panel/buttons/SaveItem'

require('../../../css/admin/users/user_section.sass')

export default class UserPanelEdit extends React.Component {
  render() {
    const { user } = this.props

    return (
      <div className="user">
        <div className="title">
          <input 
            type="text"
            onChange={this.props.handleInputChange.bind(this)}
            value={this.props.inputValue}
          />
          <CancelEdit {...this.props} item={user} type="User" />
        </div>
        <div className="admin-checkbox">
          <p>Make Admin:</p>
          <input
            type="checkbox"
            checked={this.props.checkboxValue ? "checked" : ""}
            onChange={this.props.handleCheckboxChange.bind(this)}
          />
        </div>
        <DraftNumber {...this.props} user={user} />
        <div className="action-buttons">
          <SaveItem {...this.props} item={user} type="User" handleItemSave={this.props.handleItemSave.bind(this)}/>
          <DeleteItem {...this.props} item={user} type="User" />
        </div>
      </div>
    )
  }
}