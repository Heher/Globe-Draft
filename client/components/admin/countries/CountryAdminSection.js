import React from 'react'

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
    return (
      <div className="admin-section">
        <div>
          <div className="panel add-item">
            <CountryAddItemField {...this.props} />
          </div>
        </div>
        {listItems}
      </div>
    )
  }
}