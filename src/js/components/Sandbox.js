import React from "react";

import Avatar from "./Avatar";
import Flag from "./Flag";
import CountryCard from "./CountryCard";
import Region from "./Region";

let owner = {
  id: 123,
  avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/igorgarybaldi/128.jpg"
}

let user = {
  id: 890,
  avatar_url: "https://robohash.org/user"
}

let country = {
  name: "Ireland"
}

let region = {
  regionName: "Europe",
  countries: [
    {
      name: "Ireland"
    },
    {
      name: "Spain"
    },
    {
      name: "Italy"
    }
  ]
}


export default class Sandbox extends React.Component {
  render() {
    return (
      <div>
        <h1>Avatar</h1>
        <p>
          <Avatar user={owner}/>
        </p>
        <h1>Flag</h1>
        <p>
          <Flag country={country} />
        </p>
        <h1>Country Card</h1>
        <CountryCard owner={owner} country={country} currentUser={user} />
        <h1>Region</h1>
        <Region region={region} />
      </div>
    )
  }
}