import React from 'react';
import classNames from 'classnames';

import Avatar from './Avatar';
import Flag from './Flag';
import ChoiceSubmit from './ChoiceSubmit';

require('../css/country.sass');

export default class CountryCard extends React.Component {
  handleClick(canBeSelected) {
    if (!this.props.canDraft) {
      return null;
    } else if (canBeSelected) {
      this.select(this.props.country);
    }
    return null;
  }

  select(country) {
    this.props.selectCountry(country);
  }

  render() {
    const { _id, name, shortName, userId } = this.props.country;
    const { canDraft, regionCompleted, drafts, userCountries } = this.props;

    const userHasDrafted = userCountries.find(draft => draft.country._id === _id);
    const countryDrafts = drafts.filter(country => country.countryId === _id);

    const hasBeenDrafted = countryDrafts.length > 0;
    const selected = this.props.country._id === this.props.selectedCountry._id

    const isFullyDrafted = this.props.country.draftsAllowed
      ? countryDrafts.length === this.props.country.draftsAllowed
      : hasBeenDrafted;

    const renderClasses = classNames({
      owned: userHasDrafted,
      taken: !userHasDrafted && isFullyDrafted,
      disabled: !userHasDrafted && !selected && regionCompleted,
      selected,
      waitingTurn: !canDraft
    });

    const canBeSelected = !userHasDrafted && !regionCompleted && !isFullyDrafted;

    const needsAvatar = !userHasDrafted && hasBeenDrafted;

    return (
      <div>
        <div
          className={`countryCard ${renderClasses}`}
          onClick={() => this.handleClick(canBeSelected)}
        >
          <div className="country-card-info">
            <Flag country={this.props.country} />
            <p>
              {selected ? shortName : name}
              {needsAvatar ? <Avatar users={this.props.users} userId={userId} /> : null}
            </p>
          </div>
          <ChoiceSubmit {...this.props} />
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
  selectCountry: React.PropTypes.func.isRequired
};
