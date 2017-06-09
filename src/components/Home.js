import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

export default class Home extends Component {
  btnStyles = {
    marginRight: '20px',
  }

  render () {
    return (
      <div className="col main-page">
        <h1 className="headline">The Ultimate <strong>Poker Bankroll</strong> Tracker</h1>
        <h2 className="subheadline">Free for a limited time.</h2>
        <div className="btn-holder">
          <RaisedButton
            href="#learn_more"
            label="Learn More"
            style={this.btnStyles}
          />
          <RaisedButton
            containerElement={<Link to="/register"/>}
            label="Get Started"
            secondary={true}
          />
        </div>
        <div className="bg-white row" id="learn_more">
          <div className="col-md-5 offset-md-6">
            <p>
            We got fed up with the shitty poker software out there, especially for bankroll management. Existing apps either have a horrible UI,
            are bug riddled, or both. So, despite the fact that you cheap bastards probably won't
            pay a dime for this, we're putting it out there for the community to use. Good luck at the tables.
            </p>
          </div>

          <div className="col-md-5 offset-md-1">
            Screenshots and stuff.
          </div>

          <div className="col-md-5 offset-md-6">
            <p>
              Features: tracking on desktop and mobile (iphone app coming soon), federal taxes calculated, suggestions
              for max buyin for cash games and tourneys based on your current bankroll.
            </p>
          </div>
        </div>
        <div className="bg-clear">
        </div>
      </div>
    )
  }
}
