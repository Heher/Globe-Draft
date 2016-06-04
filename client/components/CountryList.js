import React from "react";

import CountryItem from './CountryItem'

export default class CountryList extends React.Component {

  render() {
    const countries = this.props.countries.map((country, index) => {
      if ((country.userId === this.props.currentUser.id) && country.drafted) {
        return <CountryItem {...this.props} key={index} i={index} country={country} />
      }
    })

    countries.sort(function(a, b) {
      return a.props.country.round - b.props.country.round
    })

    return (
      <div className="country-list">
        <h2>{this.props.currentUser.name}'s Countries</h2>
        {countries}
      </div>
    )
  }
}