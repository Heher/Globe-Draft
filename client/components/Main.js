import React from 'react'

import WorldIcon from './icons/WorldIcon'

require('../css/main.sass')

export default class Main extends React.Component {
  render() {
    return (
      <div className="main-page">
        <div className="hero">
          <h2>Build a team to win the most medals</h2>
          <WorldIcon />
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
            </ol>
            <h4>Scoring</h4>
            <ol>
              <li>
                <p>Medal winners receive points as follows:</p>
                <p>Gold: 3 points</p>
                <p>Silver: 2 points</p>
                <p>Bronze: 1 point</p>
                <p>Team events are worth double</p>
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
            <h3>Registration</h3>
            <p>
              There is a $20 buy-in to play. Once the payment has been received, a user
              account will be made with an email address connected to a Facebook or Google
              account of the user's choice to handle logins.
            </p>
          </div>
        </div>
      </div>
    )
  }
}