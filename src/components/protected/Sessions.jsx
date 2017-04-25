import React, { Component } from 'react';
import { ref, firebaseAuth } from '../../config/constants';
import moment from 'moment';

export default class Sessions extends Component {
    constructor() {
        super();
        this.state = {
            sessions: []
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

            this.setState({ sessions })
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