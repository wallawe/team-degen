import React, { Component } from 'react';
import { login, resetPassword } from '../helpers/auth';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

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
          this.setState({loginMessage: 'Invalid username/password.'})
        })
  }

  resetPassword = () => {
    resetPassword(this.state.email)
      .then(() => {
        this.setState({loginMessage: null })
        alert(`Password reset email sent to ${this.state.email}.`)
      })
      .catch((error) => {
        this.setState({loginMessage: 'Email address not found. Please enter it above.'}
      )})
  }

  render () {
    return (
      <div className="col-md-4 offset-md-4 col-sm-8 offset-sm-2">
        <h1 className="header">Login</h1>
        <Paper zDepth={1} className="paper-box">
          <form onSubmit={this.handleSubmit.bind(this)}>
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
              onChange={(e) => this.setState({pw: e.target.value})}
            />
            <RaisedButton label="Login" primary={true} type="submit" className="top-20"/>

            {
              this.state.loginMessage &&
              <p className="error">{this.state.loginMessage}</p>
            }
          </form>
        </Paper>

        <a href="#" className="forgot-pw" onClick={this.resetPassword}>Forgot Password?</a>
      </div>
    )
  }
}
