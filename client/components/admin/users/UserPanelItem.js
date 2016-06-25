import React from 'react'

import UserPanelEdit from './PanelEdit'
import UserPanelInfo from './PanelInfo'
import PanelButtons from './PanelButtons'

export default class UserPanelItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: this.props.user.name,
    }
  }

  handleInputChange(event) {
    this.setState({inputValue: event.target.value})
  }

  handleItemSave() {
    this.props.editUser(this.props.user._id, {name: this.state.inputValue})
  }

  render() {
    const { user } = this.props

    if (user.editing) {
      return (
        <UserPanelEdit 
          {...this.props} 
          user={user}
          inputValue={this.state.inputValue}
        />
      )
    } else {
      return (
        <UserPanelInfo {...this.props} user={user} />
      )
    }
  }
}