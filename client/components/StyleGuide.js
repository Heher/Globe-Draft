import React from 'react'
import { Link } from 'react-router'

import TextStyle from './style/TextStyle'
import EventStyle from './style/EventStyle'
import DraftStyle from './style/DraftStyle'

import '../css/style_guide.sass'

export default class StyleGuide extends React.Component {
  renderStyleType(type) {
    switch (type) {
      case 'text' :
        return <TextStyle {...this.props} />
      case 'event' :
        return <EventStyle {...this.props} />
      case 'draft' :
        return <DraftStyle {...this.props} />
      default :
        return null
    }
  }

  render() {
    const { params } = this.props

    return (
      <div className="style-guide">
        <div className="menu">
          <Link to="/styleguide/text" activeClassName="active">Text</Link>
          <Link to="/styleguide/event" activeClassName="active">Event</Link>
          <Link to="/styleguide/draft" activeClassName="active">Draft</Link>
        </div>
        {this.renderStyleType(params.type)}
      </div>
    )
  }
}
