import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class UserStore extends EventEmitter {
  constructor() {
    super()
    this.users = [
      {
        id: 113464613,
        name: "John"
      },
      {
        id: 235684679,
        name: "Alex"
      },
    ];
  }

  createUser(text) {
    const id = Date.now();

    this.users.push({
      id,
      name
    });

    this.emit("change");
  }

  getAll() {
    return this.users;
  }

  handleActions(action) {
    switch(action.type) {
      case "CREATE_USER": {
        this.createUser(action.text);
        break;
      }
      case "RECEIVE_USERS": {
        this.users = action.users;
        this.emit("change");
        break;
      }
    }
  }

}

const userStore = new UserStore;
dispatcher.register(userStore.handleActions.bind(userStore));

export default userStore;