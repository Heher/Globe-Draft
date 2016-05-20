import React from "react";

import CountryItem from './CountryItem'

export default class CountryCard extends React.Component {

  render() {
    const currentUser = this.props.users[0]

    const countries = this.props.countries.map((country, index) => {
      if (country.userId === currentUser.id) {
        return <CountryItem {...this.props} key={index} i={index} country={country} />
      }
    })

    return (
      <div className="country-list">
        <h2>{currentUser.name}'s Countries</h2>
        {countries}
      </div>
    )
  }
}