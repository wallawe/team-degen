import React, {Component} from 'react';
import {ref} from '../../config/constants';
import {getCurrentUserId, getCurrentUserInfo} from '../../config/api';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

export default class Sessions extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      uid: '',
      gameType: 'nlh',
      buyin: '',
      cashout: '',
      runningTotal: '',
      startTime: null,
      endTime: '',
      blinds: '',
      secondsElapsed: 0,
      lastClearedIncrementer: null
    }
  }

  _submitForm(e) {
    e.preventDefault();

    const { buyin, cashout, gameType, runningTotal, uid, email } = this.state;

    const sessionsList = ref.child(`users/${this.state.uid}/sessions`);
    const userInfo = ref.child(`users/${this.state.uid}/info`);
    const profit = parseFloat(cashout - buyin);
    const newRunningTotal = runningTotal + profit;

    let newSessionObject = {
      date: Date.now(),
      runningTotal: newRunningTotal,
      gameType,
      buyin,
      cashout,
      profit
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

  render() {
    return (
      <div className="container new-session">
        <h3 className="header">Get on the Grind</h3>
        <div className="row">
          <div className="col-sm-10 offset-sm-1 col-md-6 offset-md-3 well well-light">
            <form onSubmit={this._submitForm.bind(this)}>
              <SelectField
                floatingLabelText="Game Type"
                className="bottom-20"
                value={this.state.gameType}
                fullWidth={true}
                onChange={(e,i,v) => { this.setState({gameType: v})}}>
                <MenuItem value={'nlh'} primaryText="No-Limit Holdem" />
                <MenuItem value={'plo'} primaryText="Pot Limit Omaha" />
                <MenuItem value={'hilo'} primaryText="Omaha Hi-Low" />
                <MenuItem value={'razz'} primaryText="Razz" />
                <MenuItem value={'stud'} primaryText="7 Card Stud" />
              </SelectField>

              <TimePicker
                hintText="Session Start Time"
                fullWidth={true}
                onChange={(e, time) => {this.setState({startTime: time})}}
                value={this.state.startTime}
              />
              <TextField
                hintText=""
                floatingLabelText="Buyin Amount"
                fullWidth={true}
                type="number"
                value={this.state.buyin}
                onChange={(e,val) => { this.setState({buyin: val})}}
              />
              <TextField
                hintText=""
                floatingLabelText="Cash Out Amount"
                fullWidth={true}
                type="number"
                value={this.state.cashout}
                onChange={(e,val) => { this.setState({cashout: val})}}
              />

              <RaisedButton label="Submit" primary={true} fullWidth={true} type="submit" className="top-20" />
            </form>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const userId = getCurrentUserId();

    getCurrentUserInfo(userId).then((data) => {
      let {email, uid, runningTotal} = data.val().info; // data.val() is a firebase thing you have to do
      this.setState({email, uid, runningTotal});
    });

  }
}
