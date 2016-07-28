import React from 'react'

export default class EventIcon extends React.Component {

  render() {
    return (
      <svg viewBox="20 14 60 70" onClick={this.props.toggle.bind(this)}>
        <path d="M52.8 21.7c-1.8-1.8-4.7-1.8-6.4 0L6 62c-2 2-2 5.2 0 7.2 2 2 5.2 2 7.2 0l33.1-33.1c1.8-1.8 4.7-1.8 6.4 0l33.1 33.1c2 2 5.2 2 7.2 0 2-2 2-5.2 0-7.2L52.8 21.7z"/>
        <text y="115">  Created by Tom Walsh</text>
        <text y="120">  from the Noun Project</text>
      </svg>
    )
  }
}