import React from 'react'

import UserCountryItem from './UserCountryItem'

require('../css/country_list.sass')

export default class UserCountryList extends React.Component {

  render() {
    const { user, drafts } = this.props

    const userCountries = drafts.map((draft, index) => {
      if (draft.userId === user._id) {
        return <UserCountryItem {...this.props} key={index} i={index} country={draft.country} round={draft.round} />
      }
      return null
    }).filter(Boolean)

    userCountries.sort((a, b) => a.props.round - b.props.round)

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
