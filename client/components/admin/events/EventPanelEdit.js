import React from 'react'

import PanelButtons from '../panel/PanelButtons'
import EventCountrySelect from './EventCountrySelect'

export default class EventPanelEdit extends React.Component {
  render() {
    const { event, goldCountries, silverCountries } = this.props

    let goldSelects = []
    if (goldCountries.length > 0) {
      goldCountries.map((country, index) => {
        goldSelects.push(<EventCountrySelect {...this.props} key={index} country={country} />)
      })
    } else {
      goldSelects.push(<EventCountrySelect {...this.props} key={0} />)
    }

    let silverSelects = []
    if (silverCountries.length > 0) {
      silverCountries.map((country, index) => {
        silverSelects.push(<EventCountrySelect {...this.props} key={index} country={country} />)
      })
    } else {
      silverSelects.push(<EventCountrySelect {...this.props} key={0} />)
    }

    return (
      <div className="panel">
        <input 
          type="text"
          onChange={this.props.handleInputChange.bind(this)}
          value={this.props.inputValue}
        />
        <p>Gold:</p>
        {goldSelects}
        <p>Silver:</p>
        {silverSelects}
        <PanelButtons
          {...this.props}
          item={event}
          type="Event"
          editing={event.editing}
          handleItemSave={this.props.handleItemSave.bind(this)}
        />
      </div>
    )
  }
}