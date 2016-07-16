import React from 'react'
import moment from 'moment'
import { Link } from 'react-router'

export default class EventButton extends React.Component {
  convertDate(datetime) {
    if (datetime) {
      return moment(datetime, "YYYY-MM-DD").format("M/D")
    } else {
      return "All"
    }
  }

  renderLink(day) {
    if (day) {
      return `/${day}`
    } else {
      return ""
    }
  }

  render() {
    return (
      <Link className="event-link" to={`/events${this.renderLink(this.props.day)}`} activeClassName="active">{this.convertDate(this.props.day)}</Link>
    )
  }
}