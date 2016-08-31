import React from 'react'

import UserCountryItem from './UserCountryItem'

require('../css/country_list.sass')

export default class UserCountryList extends React.Component {

  render() {
    const { user, countries } = this.props

    const userCountries = countries.map((country, index) => {
      if ((country.userId === user._id) && country.drafted) {
        return <UserCountryItem {...this.props} key={index} i={index} country={country} />
      }
      return null
    }).filter(Boolean)

    userCountries.sort((a, b) => a.props.country.round - b.props.country.round)

    return (
      <div className={`user-country-list ${userCountries.length > 0 ? '' : 'empty'}`}>
        <ul>
          {userCountries}
        </ul>
      </div>
    )
  }
}

UserCountryList.propTypes = {
  user: React.PropTypes.object.isRequired,
  countries: React.PropTypes.array.isRequired
}
