import React from 'react'

import PanelButtons from '../panel/PanelButtons'
import EventCountrySelect from './EventCountrySelect'
import CancelEdit from '../panel/buttons/CancelEdit'
import DeleteItem from '../panel/buttons/DeleteItem'
import SaveItem from '../panel/buttons/SaveItem'

export default class EventPanelEdit extends React.Component {
  render() {
    const { event, goldCountries, silverCountries, bronzeCountries } = this.props

    let goldSelects = []
    if (goldCountries.length > 0) {
      goldCountries.map((country, index) => {
        goldSelects.push(<EventCountrySelect {...this.props} key={index} country={country} type="goldSelect" />)
      })
    } else {
      goldSelects.push(<EventCountrySelect {...this.props} key={0} type="goldSelect" />)
    }

    let silverSelects = []
    if (silverCountries.length > 0) {
      silverCountries.map((country, index) => {
        silverSelects.push(<EventCountrySelect {...this.props} key={index} country={country} type="silverSelect" />)
      })
    } else {
      silverSelects.push(<EventCountrySelect {...this.props} key={0} type="silverSelect" />)
    }

    let bronzeSelects = []
    if (bronzeCountries.length > 0) {
      bronzeCountries.map((country, index) => {
        bronzeSelects.push(<EventCountrySelect {...this.props} key={index} country={country} type="bronzeSelect" />)
      })
    } else {
      bronzeSelects.push(<EventCountrySelect {...this.props} key={0} type="bronzeSelect" />)
    }

    return (
      <div className="event">
        <div className="title">
          <input 
            type="text"
            onChange={this.props.handleInputChange.bind(this)}
            value={this.props.inputValue}
          />
          <CancelEdit {...this.props} item={event} type="Event" />
        </div>
        <div className="admin-checkbox">
          <p>Team Event:</p>
          <input
            type="checkbox"
            checked={this.props.checkboxValue ? "checked" : ""}
            onChange={this.props.handleCheckboxChange.bind(this)}
          />
        </div>
        <div className="medal-winners">
          <div className="golds">
            {goldSelects}
            <EventCountrySelect {...this.props} key={0} type="goldSelect" />
          </div>
          <div className="silvers">
            {silverSelects}
            <EventCountrySelect {...this.props} key={0} type="silverSelect" />
          </div>
          <div className="bronzes">
            {bronzeSelects}
            <EventCountrySelect {...this.props} key={0} type="bronzeSelect" />
          </div>
        </div>
        <div className="action-buttons">
          <SaveItem {...this.props} item={event} type="Event" handleItemSave={this.props.handleItemSave.bind(this)}/>
          <DeleteItem {...this.props} item={event} type="Event" />
        </div>
      </div>
    )
  }
}