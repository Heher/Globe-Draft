import React from 'react'

export default class DraftIcon extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClick() {
    console.log("logout")
  }

  render() {

    return (
      <svg className="draft-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90">
        <path d="M19.2 0c6.3 0 11.4 5 11.4 11.2 0 6.2-5.1 11.2-11.4 11.2S7.7 17.4 7.7 11.2C7.7 5 12.9 0 19.2 0z"/>
        <path d="M76.8 0c6.3 0 11.4 5 11.4 11.2 0 6.2-5.1 11.2-11.4 11.2 -6.3 0-11.4-5-11.4-11.2C65.4 5 70.5 0 76.8 0z"/>
        <path d="M40.1 11.5l0 0c0-0.1 0-0.2 0-0.3 0-4.2 3.5-7.6 7.8-7.6s7.8 3.4 7.8 7.6l0.4 7.8c2-2 3.3-4.8 3.3-7.8C59.3 5 54.2 0 47.9 0c-6.3 0-11.5 5-11.5 11.2 0 3.1 1.3 5.9 3.3 7.9L40.1 11.5z"/>
        <path d="M41.4 45.4l-18.7 7.8c-4.1 1.7-6.7 6-6.2 10.4l5.6 26.2c0.7 3.1 3.4 5.4 6.6 5.5l20.4 0.6c3.6 0.1 6.9-1.8 8.6-4.9l19.1-33.7c1.1-2 0.5-4.5-1.5-5.7l0 0c-1.7-1-3.8-0.7-5.2 0.7l-9.2 9.3c-2.3 2.3-6.2 0.8-6.4-2.5l-1.9-48.2c-0.1-2.5-2.2-4.6-4.8-4.6h0c-2.5 0-4.6 2-4.7 4.5L41.4 45.4z"/>
        <text y="111" font-size="5px" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif" class="a">  Created by Kirill Ulitin</text>
        <text y="116" font-size="5px" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif" class="a">  from the Noun Project</text>
      </svg>
    )
  }
}