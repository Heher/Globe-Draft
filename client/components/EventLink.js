import React from 'react'
import moment from 'moment'
import { Link } from 'react-router'
import classNames from 'classnames'

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

  isToday(day) {
    const today = Date.now()
    const convertedToday = moment(today, "x").format("M/D")
    return convertedToday === this.convertDate(day) ? true : false
  }

  render() {
    const { mainLink, day } = this.props
    const todayClass = classNames({
      'today': this.isToday(day)
    })
    return (
      <Link 
        className={`event-link ${todayClass}`}
        to={this.renderLink(mainLink, day)}
        activeClassName="active">{this.convertDate(this.props.day)}
      </Link>
    )
  }
}