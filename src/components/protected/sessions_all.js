import React, {Component} from 'react';
import {ref, firebaseAuth} from '../../config/constants';
import moment from 'moment';
import { blue } from '../index';
import gameTypes from '../../helpers/game_types';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
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
      <div className="container all-sessions">
        <div className="row">
          <div className="col-4">
            <ul className="well well-dark">
              <h2>{this.state.sessions.length} Recent Sessions</h2>
              {this.state.sessions.map((session, i) => {
                return <SessionList gameType={session.gameType} profit={session.profit} key={i} when={session.date}></SessionList>
              })}
            </ul>
          </div>

          <div className="col-8">
            <div className="well well-dark">
              <h2>Chart</h2>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={this.state.sessions} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
                  <Line type="monotone" dataKey="runningTotal" stroke={blue} />
                  <ReferenceLine y="0" stroke="#ffffff"/>
                  <XAxis dataKey="date" tickFormatter={this.formatGraphDate.bind(this)}/>
                  <YAxis dataKey="runningTotal"/>
                  <Tooltip labelFormatter={(a) => this.formatGraphDate(a)}/>
                </LineChart>
              </ResponsiveContainer>
            </div>

            <h3>Total Profit Over All Sessions: $
              <strong>{this.state.totalProfit}</strong>
            </h3>
          </div>
        </div>
      </div>
    )
  }

  getSessions(sessionsObject) {
    return Object.keys(sessionsObject).map((key) => {
      return sessionsObject[key];
    });
  }

  componentDidMount() {

    const {currentUser} = firebaseAuth();

    ref.child(`users/${currentUser.uid}`).once('value', (snapshot) => {
      const totalProfit = snapshot.val().info.runningTotal;
      const sessions = Object.keys(snapshot.val().sessions).map((key) => {
        return snapshot.val().sessions[key];
      });
      this.setState({sessions, totalProfit})
    });

      // let totalProfit = sessions.map((item) => {
      //   return item.profit;
      // }).reduce((acc, val) => {
      //   return acc + val;
      // }, 0);
  }
}

const SessionList = (props) => {
  return(
    <li className="list-item">
      <div className="left-side">
        <strong className={props.profit >= 0 ? 'win': 'loss'}>${props.profit}</strong><br/>
      </div>
      <div className="right-side">
        <span className="game-type">{gameTypes[props.gameType]}</span>
        <span className="date">{moment(props.when).format('MM/DD/YY')}</span>
      </div>
    </li>
  )
}
