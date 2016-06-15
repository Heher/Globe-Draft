import React from "react"
import { Link } from 'react-router'

require('../css/users.sass')

export default class Users extends React.Component {

  constructor(props) {
    super(props)
  }

  handleFormSubmit(event) {
    event.preventDefault()
    const input = event.target.getElementsByTagName('input')[0]
    let value = input.value
    this.props.addUser(value)
    input.value = ""
  }

  createPositionButtons(user, usersLength) {
    let buttons = []
    for (let i = 0; i < usersLength; i++) {
      const draftNum = i + 1
      buttons.push(<button key={i} className={user.draftNum === draftNum ? "selected" : ""} onClick={this.props.setDraft.bind(this, user._id, draftNum)}>{draftNum}</button>)
    }
    return buttons
  }

  handleEditButton(editingDraft) {
    if (editingDraft) {
      let draftOrders = []
      this.props.users.map(user => {
        draftOrders.push({id: user._id, draftNum: user.draftNum})
      })
      return this.props.saveDraftOrder.bind(this, draftOrders)
    } else {
      return this.props.changeDraftOrder.bind(this)
    }
  }

  render() {
    const currentUser = this.props.users.filter((user) => {
      return user.selected
    })[0]

    const usersLength = this.props.users.length

    const editingDraft = this.props.settings.editingDraftOrder

    const users = this.props.users.map((user, index) => {
      return (
        <div key={index}>
          <p className={currentUser && currentUser._id === user._id ? "selected" : ""}>{user.name} - {user.draftNum}</p>
          <button onClick={this.props.deleteUser.bind(this, user.name)}>DELETE</button>
          <button onClick={this.props.changeUser.bind(this, user._id)}>SELECT</button>
          <div className={`draft-buttons ${editingDraft ? 'editing' : ''}`}>
            {this.createPositionButtons(user, usersLength)}
          </div>
        </div>
      )
    })

    return (
      <div className="user-list">
        <h1>Users</h1>
        <button onClick={this.handleEditButton(editingDraft)}>{editingDraft ? `SAVE` : `EDIT`}</button>
        {users}
        <form onSubmit={event => this.handleFormSubmit(event)}>
          Add User: <input type="text" />
          <button type="submit">SUBMIT</button>
        </form>
        <Link to='/countries'>Countries</Link>
      </div>
    );
  }
}