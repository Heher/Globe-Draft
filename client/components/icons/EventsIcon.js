import React from 'react'

export default class EventsIcon extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClick() {
    console.log("logout")
  }

  render() {

    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="40 20 20 60">
        <path d="M36 33.7c-2.4 0-4.4 2-4.4 4.4s2 4.4 4.4 4.4c2.4 0 4.4-2 4.4-4.4S38.4 33.7 36 33.7zM36 39.5c-0.8 0-1.4-0.6-1.4-1.4s0.6-1.4 1.4-1.4c0.8 0 1.4 0.6 1.4 1.4S36.8 39.5 36 39.5zM36 57.5c-2.4 0-4.4 2-4.4 4.4s2 4.4 4.4 4.4c2.4 0 4.4-2 4.4-4.4S38.4 57.5 36 57.5zM36 63.3c-0.8 0-1.4-0.6-1.4-1.4s0.6-1.4 1.4-1.4c0.8 0 1.4 0.6 1.4 1.4S36.8 63.3 36 63.3zM36 45.6c-2.4 0-4.4 2-4.4 4.4s2 4.4 4.4 4.4c2.4 0 4.4-2 4.4-4.4S38.4 45.6 36 45.6zM36 51.4c-0.8 0-1.4-0.6-1.4-1.4s0.6-1.4 1.4-1.4c0.8 0 1.4 0.6 1.4 1.4S36.8 51.4 36 51.4zM45 39.6h21.9c0.8 0 1.5-0.7 1.5-1.5s-0.7-1.5-1.5-1.5H45c-0.8 0-1.5 0.7-1.5 1.5S44.1 39.6 45 39.6zM66.9 48.5H45c-0.8 0-1.5 0.7-1.5 1.5s0.7 1.5 1.5 1.5h21.9c0.8 0 1.5-0.7 1.5-1.5S67.7 48.5 66.9 48.5zM66.9 60.4H45c-0.8 0-1.5 0.7-1.5 1.5s0.7 1.5 1.5 1.5h21.9c0.8 0 1.5-0.7 1.5-1.5S67.7 60.4 66.9 60.4z"/>
        <text y="115" font-size="5px" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif" class="a">  Created by Sergey Demushkin</text>
        <text y="120" font-size="5px" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif" class="a">  from the Noun Project</text>
      </svg>
    )
  }
}