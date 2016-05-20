import React from "react"

import CountryCard from "./CountryCard"

export default class Region extends React.Component {

  render() {
    const completed = (this.props.region.numSelected === this.props.region.maxCountriesSelected)

    const countries = this.props.countries.map((country, index) => {
      if (country.regionId === this.props.region.id) {
        return <CountryCard {...this.props} key={index} i={index} country={country} regionCompleted={completed} />
      }
    })

    return (
      <div className="region">
        <h1>{this.props.region.regionName}</h1><span>{this.props.region.numSelected} selected of {this.props.region.maxCountriesSelected}</span>
        <div>
          {countries}
        </div>
      </div>
    )
  }
}