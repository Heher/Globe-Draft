import dispatcher from "../dispatcher";

export function createUser(text) {
  dispatcher.dispatch({
    type: "CREATE_USER",
    text,
  });
}

export function deleteUser(id) {
  dispatcher.dispatch({
    type: "DELETE_USER",
    id,
  });
}

export function reloadUsers() {
  // axios("http://someurl.com/somedataendpoint").then((data) => {
  //   console.log("got the data!", data);
  // })
  dispatcher.dispatch({type: "FETCH_USERS"});
  setTimeout(() => {
    dispatcher.dispatch({type: "RECEIVE_USERS", users: [
      {
        id: 8484848484,
        name: "Poop"
      },
      {
        id: 6262627272,
        text: "Butt"
      },
    ]});
  }, 1000);
}