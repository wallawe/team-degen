import React, { Component } from 'react';
import { ref } from '../../config/constants';
import { getCurrentUserId, getCurrentUserInfo } from '../../config/api';

export default class Sessions extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            uid: '',
            gameType: 'nlh',
            buyin: '',
            cashout: '',
            runningTotal: ''
        }
    }

    _submitForm(e) {
        e.preventDefault();

        const sessionsList = ref.child(`users/${this.state.uid}/sessions`);
        const userInfo = ref.child(`users/${this.state.uid}/info`);
        const { buyin, cashout, gameType, runningTotal, uid, email } = this.state;
        const profit = parseFloat(cashout - buyin);
        const newRunningTotal = runningTotal + profit;

        let newSessionObject = {
            date: Date.now(),
            gameType: gameType,
            buyin: buyin,
            cashout: cashout,
            profit: profit,
            runningTotal: newRunningTotal
        }

        let userObject = {
            email: email,
            uid: uid,
            runningTotal: newRunningTotal
        }

        // add session to list, update running total, add total at this point in time
        sessionsList.push(newSessionObject).then(() => {
            userInfo.update(userObject);
            alert('success');
            // redirect to dashboard
        });
    }

    _changeGame(e) {
        this.setState({ gameType: e.target.value });
    }

    render() {
        return (
            <div>
                <h3>Submit a new session</h3>
                <form onSubmit={this._submitForm.bind(this)}>
                    <select value={this.state.gameType} onChange={this._changeGame.bind(this)}>
                        <option value="nlh">No Limit Holdem</option>
                        <option value="plo">Pot Limit Omaha</option>
                        <option value="hi-low">Omaha Hi-Low</option>
                        <option value="razz">Razz</option>
                        <option value="stud">7 Card Stud</option>
                    </select><br/>
                    <input type="number" required value={this.state.buyin} onChange={ (e) => { this.setState({ buyin: e.target.value }) } } placeholder="Buy In" /><br/>
                    <input type="number" required value={this.state.cashout} onChange={ (e) => { this.setState({ cashout: e.target.value }) } } placeholder="Cash out" /><br/>
                    <button type="submit">Submit!</button>
                </form>
            </div>
        )
    }

    componentDidMount() {
        const userId = getCurrentUserId();

        getCurrentUserInfo(userId).then( (data) => {
            let { email, uid, runningTotal } = data.val().info; // data.val() is a firebase thing you have to do
            this.setState({ email, uid, runningTotal });
        });

    }
}
