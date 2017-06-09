import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { logout } from '../helpers/auth';
import logo from '../images/option-1.svg';

class LoggedOut extends Component {
  // static muiName = 'FlatButton'

  render(){
    return(
      <div>
        <FlatButton
          {...this.props}
          containerElement={<Link to="/login" />}
          label="Login"
        />

        <RaisedButton
          {...this.props}
          style={{verticalAlign: 'top', marginTop: '7px'}}
          containerElement={<Link to="/register" />}
          label="Register"
        />
      </div>
    )
  }
}
LoggedOut.muiName = 'FlatButton';

class LoggedIn extends Component {
  iconStyle = {
    color: '#ffffff',
    fill: '#ffffff'
  }

  logOut() {
    logout().then(() => {

    }).catch((err) => {
      alert('Error. Please email admin@teamdegen.com');
    });
  }

  render() {
    return (
      <IconMenu
        iconStyle={this.iconStyle}
        iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
      >
        <MenuItem
          primaryText="New Session"
          containerElement={<Link to="/new-session" />}
        />
        <MenuItem
          primaryText="Dashboard"
          containerElement={<Link to="/dashboard" />}
        />
        <MenuItem
          primaryText="Log Out"
          onClick={this.logOut}
        />
      </IconMenu>
    )
  }
}
LoggedIn.muiName = 'IconMenu';

export default class NavBar extends Component {
  navStyles = {
      backgroundColor: 'transparent',
      boxShadow: 'none'
  }

  render() {
    return(
      <div>
        <div className="bg-holder"></div>
        <AppBar
          style={this.navStyles}
          title={<Link to="/" className="logo"><img alt="" src={logo} /><span>Team</span> Degen</Link>}
          iconElementLeft={<div></div>}
          iconElementRight={this.props.authed ? <LoggedIn /> : <LoggedOut/> }
        />
      </div>
    )
  }
}
