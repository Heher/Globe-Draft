import React from "react";

import Avatar from "./Avatar";
import Flag from "./Flag";

let user = {
  avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/igorgarybaldi/128.jpg"
}

let country = {
  name: "Ireland"
}

export default class Sandbox extends React.Component {
  render() {
    return (
      <div>
        <h1>Avatar</h1>
        <p>
          <Avatar user={user}/>
        </p>
        <h1>Flag</h1>
        <p>
          <Flag country={country} />
        </p>
        <h1>Country Card</h1>
        <button>Ireland</button>
      </div>
    )
  }
}