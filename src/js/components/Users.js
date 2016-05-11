import React from "react";

import * as UserActions from "../actions/UserActions";
import UserStore from "../stores/UserStore";


export default class Users extends React.Component {
  constructor() {
    super();
    this.getUsers = this.getUsers.bind(this);
    this.state = {
      users: UserStore.getAll(),
    };
  }

  componentWillMount() {
    UserStore.on("change", this.getUsers);
  }

  componentWillUnmount() {
    UserStore.removeListener("change", this.getUsers);
  }

  getUsers() {
    this.setState({
      users: UserStore.getAll(),
    });
  }

  // reloadTodos() {
  //   TodoActions.reloadTodos();
  // }

  render() {
    // const { users } = this.state;

    // const UserComponents = todos.map((todo) => {
    //     return <Todo key={todo.id} {...todo}/>;
    // });

    return (
      <div>
        <h1>Users</h1>
        <p>{this.state.users[1].name}</p>
      </div>
    );
  }
}