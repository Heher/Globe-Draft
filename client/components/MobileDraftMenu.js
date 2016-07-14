import React from 'react'
import { Link } from 'react-router'

require('../css/mobile_draft_menu.sass')

export default class MobileDraftMenu extends React.Component {
  render() {
    return (
      <div className="draft-menu">
        <Link to='/draft' activeClassName="active">Countries</Link>
      </div>
    )
  }
}