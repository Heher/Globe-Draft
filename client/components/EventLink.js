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

  renderLink(mainLink, day) {
    let link = "/"
    if (mainLink) {
      link = link + mainLink
    }
    if (day) {
      link = link + `/${day}`
    }
    return link
  }

  render() {
    const { mainLink, day } = this.props
    return (
      <Link className="event-link" to={this.renderLink(mainLink, day)} activeClassName="active">{this.convertDate(this.props.day)}</Link>
    )
  }
}