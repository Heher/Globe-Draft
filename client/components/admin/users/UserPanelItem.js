import React from 'react'

import UserPanelEdit from './UserPanelEdit'
import UserPanelInfo from './UserPanelInfo'
import PanelButtons from '../panel/PanelButtons'

export default class UserPanelItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: this.props.user.name,
      checkboxValue: this.props.user.isAdmin
    }
  }

  handleInputChange(event) {
    this.setState({inputValue: event.target.value})
  }

  handleCheckboxChange(event) {
    this.setState({checkboxValue: event.target.checked})
  }

  handleItemSave() {
    this.props.editUser(this.props.user._id, {name: this.state.inputValue, isAdmin: this.state.checkboxValue})
  }

  render() {
    const { user } = this.props

    if (user.editing) {
      return (
        <UserPanelEdit 
          {...this.props} 
          user={user}
          inputValue={this.state.inputValue}
          checkboxValue={this.state.checkboxValue}
          handleInputChange={this.handleInputChange.bind(this)}
          handleItemSave={this.handleItemSave.bind(this)}
          handleCheckboxChange={this.handleCheckboxChange.bind(this)}
        />
      )
    } else {
      return (
        <UserPanelInfo {...this.props} user={user} />
      )
    }
  }
}