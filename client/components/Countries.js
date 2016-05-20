import React from "react";
import Region from "./Region";
import CountryList from "./CountryList";
import ChangeUser from './ChangeUser';

export default class Countries extends React.Component {
  render() {
    const selectedUser = this.props.users.map((user, index) => {
      if (user.selected) {
        return user.id
      }
    })
    return (
      <div className="content">
        <div className="regions">
          {this.props.regions.map((region, index) => <Region {...this.props} key={index} i={index} region={region} />)}
        </div>
        <div className="sidebar">
          <ChangeUser {...this.props} selectedUserId={selectedUser} />
          <CountryList {...this.props} />
        </div>
      </div>
    )
  }
}