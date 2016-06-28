import React from 'react'
import classNames from 'classnames'

import CountryAddItemField from './CountryAddItemField'
import CountryPanelItem from './CountryPanelItem'

export default class CountryAdminSection extends React.Component {

  render() {
    const { dataStatus, countries } = this.props
    let listItems = []
    if (dataStatus.countriesReceived) {
      listItems = countries.map((country, index) => {
        return <CountryPanelItem {...this.props} key={index} country={country} />
      })
    } else {
      listItems = null
    }

    const renderClasses = classNames({
      'show': this.props.addingCountry
    })

    return (
      <div>
        <div className={`add-item ${renderClasses}`}>
          <CountryAddItemField {...this.props} />
        </div>
        <div className="admin-section">
          {listItems}
        </div>
      </div>
    )
  }
}