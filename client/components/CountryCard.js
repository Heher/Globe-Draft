import React from 'react';
import classNames from 'classnames';

import Avatar from './Avatar';
import Flag from './Flag';
import ChoiceSubmit from './ChoiceSubmit';

require('../css/country.sass');

export default class CountryCard extends React.Component {
  handleClick(canDraft, canBeDeselected, canBeSelected) {
    if (!canDraft) {
      return null;
    }
    if (canBeDeselected) {
      this.deselect(this.props.region._id, this.props.country._id, this.props.currentUser._id);
    } else if (canBeSelected) {
      this.select(this.props.region._id, this.props.country._id, this.props.currentUser._id);
    }
    return null;
  }

  select(region, country, user) {
    this.props.selectCountry(region, country, user);
  }

  deselect(region, country, user) {
    this.props.deselectCountry(region, country, user);
  }

  render() {
    const { _id, name, shortName, userId, selected } = this.props.country;
    const { canDraft, regionCompleted, drafts, userCountries } = this.props;

    const userHasDrafted = userCountries.find(country => country.countryId === _id);
    const countryDrafts = drafts.filter(country => country.countryId === _id);

    const hasBeenDrafted = countryDrafts.length > 0;

    const isFullyDrafted = this.props.country.draftsAllowed
      ? countryDrafts.length === this.props.country.draftsAllowed
      : hasBeenDrafted;

    const renderClasses = classNames({
      owned: userHasDrafted,
      taken: !userHasDrafted && isFullyDrafted,
      disabled: !userHasDrafted && !selected && regionCompleted,
      selected: userHasDrafted && selected,
      waitingTurn: !canDraft
    });

    const canBeSelected = !userHasDrafted && !regionCompleted && !isFullyDrafted;
    const canBeDeselected = userHasDrafted && selected;

    const needsAvatar = !userHasDrafted && hasBeenDrafted;

    return (
      <div>
        <div
          className={`countryCard ${renderClasses}`}
          onClick={() => this.handleClick(canDraft, canBeDeselected, canBeSelected)}
        >
          <div className="country-card-info">
            <Flag country={this.props.country} />
            <p>
              {selected ? shortName : name}
              {needsAvatar ? <Avatar users={this.props.users} userId={userId} /> : null}
            </p>
          </div>
          <ChoiceSubmit {...this.props} selectedCountry={this.props.country} />
        </div>
      </div>
    );
  }
}

CountryCard.propTypes = {
  region: React.PropTypes.object.isRequired,
  country: React.PropTypes.object.isRequired,
  currentUser: React.PropTypes.object.isRequired,
  users: React.PropTypes.array.isRequired,
  canDraft: React.PropTypes.bool.isRequired,
  regionCompleted: React.PropTypes.bool.isRequired,
  selectCountry: React.PropTypes.func.isRequired,
  deselectCountry: React.PropTypes.func.isRequired
};
