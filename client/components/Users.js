import React from "react"
import { Link } from 'react-router'


export default class Users extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchUsers()
  }

  render() {
    // const currentUser = this.props.users.filter((user) => {
    //   return user.selected
    // })
    const users = this.props.users.map((user, index) => {
      return <p>{user.name}</p>
    })

    return (
      <div>
        <h1>Users</h1>
        {users}
        <button onClick={this.props.addUser.bind(this, "Travis")}>TEST</button>
        <Link to='/countries'>Countries</Link>
      </div>
    );
  }
}