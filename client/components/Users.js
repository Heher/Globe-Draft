import React from "react"
import { Link } from 'react-router'

require('../css/users.sass')

export default class Users extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchUsers()
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
      buttons.push(<button key={i} className={user.draftNum === draftNum ? "selected" : ""} onClick={this.props.editUser.bind(this, user._id, draftNum)}>{draftNum}</button>)
    }
    return buttons
  }

  render() {
    const currentUser = this.props.users.filter((user) => {
      return user.selected
    })[0]

    const usersLength = this.props.users.length

    const users = this.props.users.map((user, index) => {
      return <p className={currentUser && currentUser._id === user._id ? "selected" : ""} key={index}>{user.name}
        <button onClick={this.props.deleteUser.bind(this, user.name)}>DELETE</button>
        <button onClick={this.props.changeUser.bind(this, user._id)}>SELECT</button>
        {this.createPositionButtons(user, usersLength)}
      </p>
    })

    return (
      <div className="user-list">
        <h1>Users</h1>
        {users}
        <form onSubmit={event => this.handleFormSubmit(event)}>
          <input type="text" />
          <button type="submit">SUBMIT</button>
        </form>
        <Link to='/countries'>Countries</Link>
      </div>
    );
  }
}