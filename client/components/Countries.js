import React from "react";
import Region from "./Region";
import CountryList from "./CountryList";
import ChangeUser from './ChangeUser';

export default class Countries extends React.Component {
  render() {
    const currentUser = this.props.users.filter((user) => {
      return user.selected
    })

    return (
      <div className="content">
        <div className="regions">
          {this.props.regions.map((region, index) => <Region {...this.props} key={index} i={index} region={region} currentUser={currentUser[0]}/>)}
        </div>
        <div className="sidebar">
          <ChangeUser {...this.props} />
          <CountryList {...this.props} currentUser={currentUser[0]} />
        </div>
      </div>
    )
  }
}