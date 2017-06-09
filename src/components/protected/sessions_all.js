import React, {Component} from 'react';
import {ref, firebaseAuth} from '../../config/constants';
import moment from 'moment';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  Tooltip
} from 'recharts';

// stats:
// total profit, hours played, best/worst session, longest session, recommended stakes (tourney/cash),
// hourly rate, number of sessions

// modules:
// recent sessions, charts, highlights
export default class Sessions extends Component {
  constructor() {
    super();
    this.state = {
      sessions: [],
      totalProfit: ''
    }
  }

  formatGraphDate(date) {
    return moment(date).format('MM/DD/YY')
  }
  render() {
    return (
      <div>


        <div className="col-sm-10 offset-sm-1">

          <h2>{this.state.sessions.length} Sessions</h2>
          <ul>
            {this.state.sessions.map((session, i) => {
              return <SessionList gameType={session.gameType} profit={session.profit} key={i} when={session.date}></SessionList>
            })}
          </ul>

          <ResponsiveContainer width="80%" height={300}>
            <LineChart data={this.state.sessions}>
              <CartesianGrid strokeDasharray="3 3" stroke="#dddddd"/>
              <Line type="monotone" dataKey="runningTotal" stroke="#8884d8"/>
              <ReferenceLine y="0" stroke="#000000"/>
              <XAxis dataKey="date" tickFormatter={this.formatGraphDate.bind(this)}/>
              <YAxis dataKey="runningTotal"/>
              <Tooltip labelFormatter={(a) => this.formatGraphDate(a)}/>
            </LineChart>
          </ResponsiveContainer>

          <h3>Total Profit Over All Sessions: $
            <strong>{this.state.totalProfit}</strong>
          </h3>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const {currentUser} = firebaseAuth();
    let sessions;

    ref.child(`users/${currentUser.uid}`).once('value', (snapshot) => {
      sessions = Object.keys(snapshot.val().sessions).map((key) => {
        return snapshot.val().sessions[key];
      });

      let totalProfit = sessions.map((item) => {
        return item.profit;
      }).reduce((acc, val) => {
        return acc + val;
      }, 0);

      this.setState({sessions, totalProfit})
    });
  }
}

class SessionList extends Component {
  render() {
    return (
      <li>
        {this.props.gameType}: profit of
        <strong>{this.props.profit}</strong>
        on {moment(this.props.when).format('MMMM Do YYYY')}
      </li>
    )
  }
}