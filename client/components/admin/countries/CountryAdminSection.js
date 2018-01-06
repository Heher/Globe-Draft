import React from 'react'
import classNames from 'classnames'

import CountryAddItemField from './CountryAddItemField'
import CountryPanelItem from './CountryPanelItem'

require('../../../css/admin/countries/country_section.sass')

export default function CountryAdminSection(props) {
  const { dataStatus, countries } = props
  let listItems = []
  if (dataStatus.countriesReceived) {
    listItems = countries.map((country, index) => (
      <CountryPanelItem {...this.props} key={index} country={country} />
    ))
  } else {
    listItems = null
  }

  const renderClasses = classNames({
    show: this.props.addingCountry
  })

  return (
    <div>
      <div className={`add-item ${renderClasses}`}>
        <CountryAddItemField {...this.props} />
      </div>
      <div className="country-section">
        {listItems}
      </div>
    </div>
  )
}

CountryAdminSection.propTypes = {
  dataStatus: React.PropTypes.bool.isRequired,
  countries: React.PropTypes.array.isRequired
}
