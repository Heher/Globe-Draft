import React from 'react'

import WorldIcon from './icons/WorldIcon'
import PaymentForm from './PaymentForm'
import Register from './Register'

require('../css/main.sass')

export default class Main extends React.Component {
  render() {
    return (
      <div className="main-page">
        <div className="hero">
          <h2>Build a team to win the most medals</h2>
          <WorldIcon />
          <Register {...this.props} />
        </div>
        <div className="rules-wrapper">
          <div className="rules">
            <h3>Rules</h3>
            <h4>The Draft</h4>
            <ol>
              <li>All users are randomly assigned a draft order.</li>
              <li>Each round, a user chooses one country to draft to their team.</li>
              <li>Every user must choose one country from each region and one
              extra country from the Europe region.</li>
              <li>Draft continues in snake draft order until all users have drafted
              all their countries.</li>
            </ol>
            <h4>Scoring</h4>
            <ol>
              <li>
                <p>Medal winners receive points as follows:</p>
                <div className="point-list">
                  <p>Gold: 3 points</p>
                  <p>Silver: 2 points</p>
                  <p>Bronze: 1 point</p>
                  <p>Team events are worth double</p>
                </div>
              </li>
              <li>
                <p>
                  The United States is set as a "good" country. If a user's country
                  loses to the United States on the podium, that country doubles their points.
                </p>
                <p>
                  Likewise, beating the United States on the podium, the user's country
                  will halve their points.
                </p>
                <p>
                  China is set as a "bad" country. They act as opposite to the United States.
                  Beating China on the podium will double the user's points and losing to them
                  will halve their points.
                </p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    )
  }
}