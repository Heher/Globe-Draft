import React from 'react'
import { Link } from 'react-router'
import NavLink from './NavLink'

import UserModel from '../models/user'

export default React.createClass({

  render() {
    return (
      <div>
        <h2>Users</h2>

        {/* add some links */}
        <ul>
          <li><NavLink to="/users/john">John</NavLink></li>
          <li><NavLink to="/users/alex">Alex</NavLink></li>
        </ul>

        {this.props.children}

      </div>
    )
  }
})