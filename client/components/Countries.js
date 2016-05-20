import React from "react";
import Region from "./Region";
import CountryList from "./CountryList";

export default class Countries extends React.Component {
  render() {
    return (
      <div className="content">
        <div className="regions">
          {this.props.regions.map((region, index) => <Region {...this.props} key={index} i={index} region={region} />)}
        </div>
        <CountryList {...this.props} />
      </div>
    )
  }
}