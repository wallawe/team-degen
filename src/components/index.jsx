import React, { Component } from 'react'
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom'
import Login from './login'
import Register from './register'
import Home from './home'
import NavBar from './navbar'
import Sessions from './protected/sessions_all';
import NewSession from './protected/sessions_new';
import { firebaseAuth } from '../config/constants';
import CircularProgress from 'material-ui/CircularProgress';

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}
    />
  )
}

export default class App extends Component {
  state = {
    authed: false,
    loading: true,
  }
  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        });
      } else {
        this.setState({
          authed: false,
          loading: false
        });
      }
    });
  }
  componentWillUnmount () {
    this.removeListener()
  }
  render() {
    return this.state.loading === true ? <CircularProgress /> : (
      <BrowserRouter>
        <div>
          <NavBar authed={this.state.authed} />
          <div className="container-fluid">
            <div className="row">
            <Switch>
                <Route path='/' exact component={Home} />
                <PublicRoute authed={this.state.authed} path='/register' component={Register} />
                <PublicRoute authed={this.state.authed} path='/login' component={Login} />
                <PrivateRoute authed={this.state.authed} path='/dashboard' component={Sessions} />
                <PrivateRoute authed={this.state.authed} path='/new-session' component={NewSession} />
                <Route render={() => <h3>No Match</h3>} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
