import React from 'react'
import ReactDOM from 'react-dom'

import UserPanelEdit from './UserPanelEdit'
import UserPanelInfo from './UserPanelInfo'
import PanelButtons from '../panel/PanelButtons'

export default class UserPanelItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: this.props.user.name,
      checkboxValue: this.props.user.isAdmin,
      paidCheckboxValue: this.props.user.hasPaid
    }
  }

  handleInputChange(event) {
    this.setState({inputValue: event.target.value})
  }

  handleCheckboxChange(event) {
    this.setState({checkboxValue: event.target.checked})
  }

  handlePaidCheckboxChange(event) {
    this.setState({paidCheckboxValue: event.target.checked})
  }

  handleItemSave() {
    const panel = ReactDOM.findDOMNode(this)
    const tokenValue = panel.getElementsByClassName('admin-token')[0].value
    const emailValue = panel.getElementsByClassName('admin-email')[0].value
    console.log(this.props.user._id)
    this.props.editUser(this.props.user._id, {
      name: this.state.inputValue,
      isAdmin: this.state.checkboxValue,
      hasPaid: this.state.paidCheckboxValue,
      id_token: tokenValue,
      email: emailValue
    })
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
          paidCheckboxValue={this.state.paidCheckboxValue}
          handleInputChange={this.handleInputChange.bind(this)}
          handleItemSave={this.handleItemSave.bind(this)}
          handleCheckboxChange={this.handleCheckboxChange.bind(this)}
          handlePaidCheckboxChange={this.handlePaidCheckboxChange.bind(this)}
        />
      )
    } else {
      return (
        <UserPanelInfo {...this.props} user={user} />
      )
    }
  }
}