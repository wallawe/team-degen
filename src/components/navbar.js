import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

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
          onClick={this.props.logout}
        />
      </IconMenu>
    )
  }
}
LoggedIn.muiName = 'IconMenu';

export default class NavBar extends Component {
  render() {
    return(
      <div>
        <AppBar
          title="Team Degen"
          iconElementLeft={<div></div>}
          iconElementRight={this.props.authed ? <LoggedIn logout={this.props.logout}/> : <LoggedOut/> }
        />

      </div>
    )
  }
}
