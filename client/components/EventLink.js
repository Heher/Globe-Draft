import React from 'react'
import { Link } from 'react-router'

export default class EventButton extends React.Component {
  convertDate(datetime) {
    const splitDate = datetime.split('-')
    const year = parseInt(splitDate[0])
    const month = parseInt(splitDate[1])
    const day = parseInt(splitDate[2])

    const date = new Date(year, month - 1, day) // Date starts counting at 0 for month for some reason
    const convertedDate = date.toLocaleString(navigator.language, {
      month: 'numeric',
      day: 'numeric'
    })
    return convertedDate
  }

  showDay(date) {

  }

  render() {
    return (
      <Link className="event-link" to={`/events/${this.props.day}`} activeClassName="active">{this.convertDate(this.props.day)}</Link>
    )
  }
}