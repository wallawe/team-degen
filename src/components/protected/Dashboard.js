import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Dashboard extends Component {
  render () {
    return (
      <div>
        <h1>Dashboard you can only see if authed</h1>
        <Link to="/sessions">Sessions</Link><br/>
        <Link to="/new-session">New Session</Link>
      </div>
    )
  }
}