import React from "react";
import Region from "./Region";

export default class Countries extends React.Component {
  render() {
    return (
      <div>
        {this.props.regions.map((region, index) => <Region {...this.props} key={index} i={index} region={region} />)}
      </div>
    )
  }
}