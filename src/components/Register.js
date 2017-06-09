import React, { Component } from 'react';
import { auth } from '../helpers/auth';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

function setErrorMsg(error) {
  return {
    registerError: error.message
  }
}

export default class Register extends Component {
  constructor(){
    super();

    this.state = {
      registerError: null,
      email: '',
      pw: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    auth(this.state.email, this.state.pw)
      .catch(e => this.setState(setErrorMsg(e)))
  }

  render () {
    return (
      <div className="col-md-4 offset-md-4 col-sm-8 offset-sm-2">
        <h1 className="header">Register</h1>
        <Paper zDepth={1} className="paper-box">
          <form onSubmit={this.handleSubmit}>
            <TextField
              floatingLabelText="Email"
              type="email"
              fullWidth={true}
              onChange={(e) => this.setState({email: e.target.value})}
            />

            <TextField
              floatingLabelText="Password"
              type="password"
              fullWidth={true}
              errorText={this.state.loginMessage}
              onChange={(e) => this.setState({pw: e.target.value})}
            />

            <RaisedButton label="Login" primary={true} type="submit" className="top-20"/>

            {
              this.state.registerError &&
              <p className="error">{this.state.registerError}</p>
            }
          </form>
        </Paper>
      </div>
    )
  }
}
