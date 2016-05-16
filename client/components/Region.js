import React from "react"

import CountryCard from "./CountryCard"

let owner = {
  id: 123,
  avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/igorgarybaldi/128.jpg"
}

let user = {
  id: 890,
  avatar_url: "https://robohash.org/user"
}

export default class Region extends React.Component {
  constructor() {
    super()
    this.state = {
      selected: false
    }
  }

  render() {
    const countries = this.props.region.countries.map((country, index) => {
      return <CountryCard key={index} owner={owner} country={country} currentUser={user} />
    })
    return (
      <div className="region">
        <h1>{this.props.region.regionName}</h1><span>0 selected of 1</span>
        <div>
          {countries}
        </div>
      </div>
    )
  }
}