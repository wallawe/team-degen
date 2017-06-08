import React, { Component } from 'react';
import { login, resetPassword } from '../helpers/auth';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

function setErrorMsg(error) {
  return {
    loginMessage: error
  }
}

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      loginMessage: null,
      email: '',
      pw: '',
    }
  }
  
  handleSubmit(e) {
    e.preventDefault()
    login(this.state.email, this.state.pw)
      .catch((error) => {
          this.setState(setErrorMsg('Invalid username/password.'))
        })
  }
  resetPassword = () => {
    resetPassword(this.email.value)
      .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.email.value}.`)))
      .catch((error) => this.setState(setErrorMsg(`Email address not found.`)))
  }
  render () {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>

          <div>
            <TextField
              floatingLabelText="Email"
              type="email"
              onChange={(e) => this.setState({email: e.target.value})}
            />
          </div>

          <div>
            <TextField
              floatingLabelText="Password"
              type="password"
              onChange={(e) => this.setState({pw: e.target.value})}
            />
          </div>
          {
            this.state.loginMessage &&
            <div>
              <span>Error:</span>
              &nbsp;{this.state.loginMessage} <a href="#" onClick={this.resetPassword}>Forgot Password?</a>
            </div>
          }
          <RaisedButton label="Login" primary={true} type="submit"/>
        </form>
      </div>
    )
  }
}
