import React from 'react'
import DateTime from 'react-datetime'
import moment from 'moment'
import classNames from 'classnames'

import Flag from './Flag'
import Avatar from './Avatar'
import EventCountrySelect from './admin/events/EventCountrySelect'
import DeleteItem from './admin/panel/buttons/DeleteItem'
import SaveItem from './admin/panel/buttons/SaveItem'

require('../css/events.sass')
require('../css/inputs/country_select.sass')

export default class Event extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      inputValue: this.props.event.name,
      dateValue: new Date(this.props.event.datetime),
      checkboxValue: this.props.event.team
    }
  }

  findCountry(country) {
    let foundCountry = this.props.countries.filter(propCountry => {
      return propCountry._id === country.id
    })[0]
    const newCountry = {
      ...foundCountry,
      points: country.points
    }
    return newCountry
  }

  renderWinners(countries) {
    if (countries.length > 0) {
      return countries.map((country, index) => {
        const settingsClasses = classNames({
          'good': country._id === this.props.settings.goodCountry,
          'bad': country._id === this.props.settings.badCountry,
          'taken': country.userId,
          'owned': country.userId === this.props.currentUser._id
        })
        return (
          <div key={index} className={`winner ${settingsClasses}`}>
            <div className="winner-name">
              <span className="medal ">{country.points}</span>
              <Flag country={country}/>
              <p>
                {country.name}
                {country.userId ? <Avatar {...this.props} userId={country.userId}/> : null}
              </p>
            </div>
          </div>
        )
      })
    } else {
      return (
        <div key={0} className="winner">
          <div className="winner-name">
            <span className="medal">&nbsp;</span>
            <p>
              No Winner
            </p>
          </div>
        </div>
      )// &nbsp needed for flexbox to correctly align
    }
  }

  convertDate(datetime) {
    return moment(datetime, moment.ISO_8601).format("ddd, M/D, h:mm A")
  }

  handleEditToggle() {
    this.setState({
      editing: !this.state.editing
    })
  }

  handleInputChange(event) {
    this.setState({inputValue: event.target.value})
  }

  handleCheckboxChange(event) {
    this.setState({checkboxValue: event.target.checked})
  }

  sortCountryOptions(countries) {
    if (countries.length) {
      return countries.sort(function(a, b) {
        if(a.name < b.name) return -1
        if(a.name > b.name) return 1
        return 0
      })
    } else {
      return null
    }
  }

  renderSelects(countries, type) {
    let selects = []
    let selectOptions = []

    const sortedOptions = this.sortCountryOptions(this.props.countries)
    sortedOptions.map(country => {
      selectOptions.push({'value': country.name, 'label': country.name})
    })
    if (countries.length > 0) {
      countries.map((country, index) => {
        selects.push(
          <EventCountrySelect {...this.props} key={index} country={country} type={type} handleAddMedal={this.handleAddMedal.bind(this)} />
        )
      })
    } else {
      selects.push(<EventCountrySelect {...this.props} key={0} type={type} />)
    }
    return selects
  }

  handleAddMedal() {
    console.log("Add")
  }

  handleItemSave() {
    console.log("Saved")
  }

  render() {
    const { event, currentUser } = this.props

    const goldCountries = event.gold.map((country, index) => {
      return this.findCountry(country)
    })
    const silverCountries = event.silver.map((country, index) => {
      return this.findCountry(country)
    })
    const bronzeCountries = event.bronze.map((country, index) => {
      return this.findCountry(country)
    })

    if (this.state.editing) {
      return (
        <div className="event-section editing">
          <div className="title">
            {currentUser.isAdmin ? <button className="edit-button" onClick={this.handleEditToggle.bind(this)}>Cancel</button> : null}
            <input
              type="text"
              onChange={this.handleInputChange.bind(this)}
              value={this.state.inputValue}
            />
            <DateTime defaultValue={this.state.dateValue} timeFormat="HH:mm"/>
            <div className="admin-checkbox">
              <input
                type="checkbox"
                checked={this.state.checkboxValue ? "checked" : ""}
                onChange={this.handleCheckboxChange.bind(this)}
              />
              <p>Team Event</p>
            </div>
          </div>
          <div className="medal-winners">
            <div className="golds">
              {this.renderSelects(goldCountries, "gold")}
            </div>
            <div className="silvers">
              {this.renderSelects(silverCountries, "silver")}
            </div>
            <div className="bronzes">
              {this.renderSelects(bronzeCountries, "bronze")}
            </div>
          </div>
          <div className="action-buttons">
            <SaveItem {...this.props} item={event} type="Event" handleItemSave={this.handleItemSave.bind(this)}/>
            <DeleteItem {...this.props} item={event} type="Event" />
          </div>
        </div>
      )
    } else {
      return (
        <div className="event-section">
          <div className="title">
            {currentUser.isAdmin ? <button className="edit-button" onClick={this.handleEditToggle.bind(this)}>Edit</button> : null}
            <h4>{event.name}</h4>
            {event.datetime ? <p>{this.convertDate(event.datetime)}</p> : null}
            {event.team ? <span className="team-badge">Team</span> : null}
          </div>
          <div className="medal-winners">
            <div className="golds">
              {this.renderWinners(goldCountries)}
            </div>
            <div className="silvers">
              {this.renderWinners(silverCountries)}
            </div>
            <div className="bronzes">
              {this.renderWinners(bronzeCountries)}
            </div>
          </div>
        </div>
      )
    }
  }
}