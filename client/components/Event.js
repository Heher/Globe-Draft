import React from 'react'

export default class Event extends React.Component {
  render() {
    const { event } = this.props
    return (
      <div>
        <p>{event.name}</p>
        <p>
          <span>Gold: {event.gold.length}</span>&nbsp;
          <span>Silver: {event.silver.length}</span>&nbsp;
          <span>Bronze: {event.bronze.length}</span>
        </p>
      </div>
    )
  }
}