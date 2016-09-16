import React from 'react'
import { Link } from 'react-router'

import TextStyle from './style/TextStyle'
import EventStyle from './style/EventStyle'

import '../css/style_guide.sass'

export default class StyleGuide extends React.Component {
  renderStyleType(type) {
    switch (type) {
      case 'text' :
        return <TextStyle {...this.props} />
      case 'event' :
        return <EventStyle {...this.props} />
      default :
        return null
    }
  }

  render() {
    const { params } = this.props

    return (
      <div className="style-guide">
        <div className="sidebar">
          <Link to="/styleguide/text">Text</Link>
          <Link to="/styleguide/event">Event</Link>
        </div>
        {this.renderStyleType(params.type)}
      </div>
    )
  }
}
