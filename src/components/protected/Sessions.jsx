import React, { Component } from 'react';
import { ref, firebaseAuth } from '../../config/constants';
import moment from 'moment';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, ReferenceLine, Area, Tooltip, Legend } from 'recharts';

export default class Sessions extends Component {
    constructor() {
        super();
        this.state = {
            sessions: [],
            totalProfit: ''
        }
    }

    render() {
        return (
            <div>
                <h2>Sessions</h2>
                <ul>
                    {
                        this.state.sessions.map((session, i) => {
                            return <SessionList gameType={session.gameType} profit={session.profit} key={i} when={session.date}></SessionList>
                        })
                    }
                </ul>

                <ResponsiveContainer width="80%" height={300}>
                    <LineChart data={this.state.sessions}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <Line type="monotone" dataKey="profit" stroke="#8884d8" />
                        <ReferenceLine y="0" stroke="#000000" strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis dataKey="profit"/>
                        <Area dataKey="profit" type="monotone" fill="#0088cc" stroke="#8884d8"/>
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="profit" stroke="#8884d8" fill="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>

                <hr />
                <h3 style={{'marginBottom': '100px'}}>Total Profit Over All Sessions: $ <strong className={this.state.totalProfit >= 0 ? 'green' : 'red'}>{this.state.totalProfit}</strong></h3>
            </div>
        )
    }

    componentDidMount() {
        const { currentUser } = firebaseAuth();
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

            this.setState({ sessions, totalProfit })
        });
    }
}

class SessionList extends Component {
    render() {
        return (
            <li>
                {this.props.gameType}: profit of <strong>{this.props.profit}</strong> on {moment(this.props.when).format('MMMM Do YYYY')}
            </li>
        )
    }
}