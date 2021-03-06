import React from 'react'

export default class MenuIcon extends React.Component {

  render() {
    return (
      <svg className="menu-button" viewBox="10 10 80 90">
        <path d="M18.7 24.5h62.7c0.8 0 1.5-0.7 1.5-1.5s-0.7-1.5-1.5-1.5H18.7c-0.8 0-1.5 0.7-1.5 1.5S17.9 24.5 18.7 24.5z"/>
        <path d="M81.4 48.5H18.7c-0.8 0-1.5 0.7-1.5 1.5s0.7 1.5 1.5 1.5h62.7c0.8 0 1.5-0.7 1.5-1.5S82.2 48.5 81.4 48.5z"/>
        <path d="M81.4 75.5H18.7c-0.8 0-1.5 0.7-1.5 1.5s0.7 1.5 1.5 1.5h62.7c0.8 0 1.5-0.7 1.5-1.5S82.2 75.5 81.4 75.5z"/>
        <text y="115">  Created by Viktor Vorobyev</text>
        <text y="120">  from the Noun Project</text>
      </svg>
    )
  }
}