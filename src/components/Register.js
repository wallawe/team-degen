import React, { Component } from 'react'
import { auth } from '../helpers/auth'

function setErrorMsg(error) {
  return {
    registerError: error.message
  }
}

export default class Register extends Component {
  state = { registerError: null }
  handleSubmit = (e) => {
    e.preventDefault()
    auth(this.email.value, this.pw.value)
      .catch(e => this.setState(setErrorMsg(e)))
  }
  render () {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <input ref={(email) => this.email = email} placeholder="Email"/>
          <input type="password" placeholder="Password" ref={(pw) => this.pw = pw} />
          {
            this.state.registerError &&
            <div>
              <span>Error:</span> {this.state.registerError}
            </div>
          }
          <button type="submit">Register</button>
        </form>
      </div>
    )
  }
}
