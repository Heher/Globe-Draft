import React, { Component } from 'react';

import SportsIcon from './icons/SportsIcon';

import { spacesToDashes } from '../utilities/format'

class SportLink extends Component {
  render() {
    const { name } = this.props;

    return (
      <a className="sport-link" href={`/events/${spacesToDashes(name.toLowerCase())}`}>
        <SportsIcon icon={spacesToDashes(name.toLowerCase())} />
        <span>{name}</span>
      </a>
    );
  }
}

export default SportLink;
