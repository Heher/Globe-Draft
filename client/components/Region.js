import React from "react"

import CountryCard from "./CountryCard"

export default class Region extends React.Component {

  render() {
    let numSelected = 0
    this.props.countries.forEach((country) => {
      if (country.regionId === this.props.region.id) {
        if ((country.userId === this.props.currentUser.id) && (country.selected || country.drafted)) {
          numSelected = numSelected + 1
        }
      }
    })

    const completed = (numSelected === this.props.region.maxCountriesSelected)

    const countries = this.props.countries.map((country, index) => {
      if (country.regionId === this.props.region.id) {
        return <CountryCard {...this.props} key={index} i={index} country={country} regionCompleted={completed} />
      }
    })

    return (
      <div className="region">
        <h1>{this.props.region.regionName}</h1><span>{numSelected} selected of {this.props.region.maxCountriesSelected}</span>
        <div>
          {countries}
        </div>
      </div>
    )
  }
}