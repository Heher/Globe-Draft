import React from 'react';
import moment from 'moment';
import { groupBy } from 'underscore';

import findByQuery from '../utilities/query';

import Event from './Event';
import EventIcon from './icons/EventIcon';
import Flag from './Flag';

require('../css/event_day.sass');

export default class EventDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEvents: true
    };
    this.toggleEvents = this.toggleEvents.bind(this);
  }

  showToggle() {
    if (!this.props.daySelected) {
      return <EventIcon {...this.props} toggle={this.toggleEvents} />;
    }
    return null;
  }

  toggleEvents() {
    this.setState({
      showEvents: !this.state.showEvents
    });
  }

  sortEvents(events) {
    if (events.length) {
      return events.sort((a, b) => {
        if (a.datetime < b.datetime) return -1;
        if (a.datetime > b.datetime) return 1;
        if (a.datetime === b.datetime) {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        }
        return 0;
      });
    }
    return null;
  }

  convertDate(datetime) {
    return moment(datetime, 'YYYY-MM-DD').format('ddd, M/D');
  }

  findUserCountries(userId) {
    const userDrafts = this.props.drafts.filter(draft => draft.userId === userId);
    return userDrafts.map(draft => draft.country);
  }

  sumCountry(country, dayMedals) {
    const newCountry = country;
    let sum = 0;
    events.forEach(event => {
      event.gold.forEach(gold => {
        if (gold.id === country._id) {
          sum = sum + gold.points;
        }
      });
      event.silver.forEach(silver => {
        if (silver.id === country._id) {
          sum = sum + silver.points;
        }
      });
      event.bronze.forEach(bronze => {
        if (bronze.id === country._id) {
          sum = sum + bronze.points;
        }
      });
    });
    newCountry.points = sum;
    return newCountry;
  }

  sortByPoints(items) {
    if (items.length) {
      return items.sort((a, b) => {
        if (a.points < b.points) return 1;
        if (a.points > b.points) return -1;
        return 0;
      });
    }
    return null;
  }

  medalsOfTheDay(events) {
    return this.props.medals.filter(medal => {
      const foundEvents = events
        .map(event => {
          return event._id === medal.eventId;
        })
        .filter(Boolean);

      return foundEvents.length > 0;
    });
  }

  renderPlayerOfDay(events) {
    const dayMedals = this.medalsOfTheDay(events);

    const users = this.props.paidUsers.map(user => {
      const newUser = user;
      const userCountries = this.findUserCountries(newUser._id);

      const userMedals = dayMedals.filter(medal => {
        const foundCountries = userCountries
          .map(country => {
            return country._id === medal.countryId;
          })
          .filter(Boolean);

        return foundCountries.length > 0;
      });

      let userCountrySum = 0;
      userMedals.forEach(medal => {
        userCountrySum = userCountrySum + medal.points;
      });

      newUser.points = userCountrySum;
      return newUser;
    });
    const sortedUsers = this.sortByPoints(users);

    const topPlayer = [];
    const topPoints = sortedUsers[0].points;

    sortedUsers.forEach(user => {
      if (user.points === topPoints) {
        topPlayer.push(user.name);
      }
    });
    if (topPoints > 0) {
      const players = topPlayer.map((player, index) => (
        <p key={index} className="player">
          {player} <span className="points">{topPoints}</span>
        </p>
      ));
      if (topPlayer.length > 1) {
        return (
          <div className="player-of-day">
            <span className="title">Players of the Day</span>
            {players}
          </div>
        );
      }
      return (
        <div className="player-of-day">
          <span className="title">Player of the Day</span>
          {players}
        </div>
      );
    }
    return null;
  }

  renderCountryOfDay(events) {
    // Take all medals and reduce them by countryId
    const dayMedals = this.medalsOfTheDay(events);
    const groupedMedals = groupBy(dayMedals, medal => {
      return medal.countryId;
    });
    const groupedCountriesArray = [];
    Object.keys(groupedMedals).forEach(medalGroup => {
      const reducedCountry = groupedMedals[medalGroup].reduce((sum, medal) => {
        return sum + medal.points;
      }, 0);

      groupedCountriesArray.push({
        countryId: medalGroup,
        points: reducedCountry
      });
    });

    // Sort reduced medal list by top points
    const sortedCountries = this.sortByPoints(groupedCountriesArray);

    if (sortedCountries && sortedCountries.length > 0) {
      const topCountry = [];
      const topPoints = sortedCountries[0].points;

      sortedCountries.forEach(country => {
        if (country.points === topPoints) {
          topCountry.push(country);
        }
      });

      if (topPoints > 0) {
        const countries = topCountry.map((country, index) => {
          const countryInfo = findByQuery(this.props.countries, country.countryId, '_id');

          return (
            <div key={index} className="country">
              <div className="country-name">
                <Flag country={countryInfo} />
                <div className="country-info">
                  <span>{countryInfo.name}</span>
                </div>
                <span className="points">{topPoints}</span>
              </div>
            </div>
          );
        });

        if (topCountry.length > 1) {
          return (
            <div className="country-of-day">
              <span className="title">Countries of the Day</span>
              {countries}
            </div>
          );
        }
        return (
          <div className="country-of-day">
            <span className="title">Country of the Day</span>
            {countries}
          </div>
        );
      }
      return null;
    }
    return null;
  }

  renderCountryTotal(events, country) {
    let sum = 0;
    events.forEach(event => {
      event.gold.forEach(gold => {
        if (gold.id === country._id) {
          sum = sum + gold.points;
        }
      });
      event.silver.forEach(silver => {
        if (silver.id === country._id) {
          sum = sum + silver.points;
        }
      });
      event.bronze.forEach(bronze => {
        if (bronze.id === country._id) {
          sum = sum + bronze.points;
        }
      });
    });
    return (
      <div className="player-of-day">
        <p className="player">
          <Flag country={country} />
          {country.name} <span className="points">{sum}</span>
        </p>
      </div>
    );
  }

  render() {
    const sortedEvents = this.sortEvents(this.props.eventGroup);
    const events = sortedEvents.map((event, index) => (
      <Event
        {...this.props}
        key={index}
        event={event}
        country={this.props.country ? this.props.country._id : null}
      />
    ));

    return (
      <div className={`event-day ${this.state.showEvents ? 'show' : 'hide'}`}>
        <div className="day-title">
          <div className="header">
            <h2 onClick={this.toggleEvents}>{this.convertDate(this.props.title)}</h2>
            {this.showToggle()}
          </div>
          {this.props.filterType === 'country'
            ? this.renderCountryTotal(sortedEvents, this.props.country)
            : this.renderPlayerOfDay(this.props.eventGroup)}
          {this.props.filterType === 'country'
            ? null
            : this.renderCountryOfDay(this.props.eventGroup)}
        </div>
        {events}
      </div>
    );
  }
}

EventDay.propTypes = {
  daySelected: React.PropTypes.bool,
  countries: React.PropTypes.array.isRequired,
  paidUsers: React.PropTypes.array.isRequired,
  eventGroup: React.PropTypes.array.isRequired,
  country: React.PropTypes.object,
  filterType: React.PropTypes.string,
  title: React.PropTypes.string
};
