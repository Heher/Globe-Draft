import React from 'react'
import { IndexLink, Link } from 'react-router'
import NavLink from './NavLink'

export default React.createClass({
  render() {
    return (
      <div>
        <h1>Ghettohub Issues</h1>
        <ul role="nav">
          <li><NavLink to="/" onlyActiveOnIndex={true}>Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/users">Users</NavLink></li>
        </ul>

        {/* add this */}
        {this.props.children}

      </div>
    )
  }
})