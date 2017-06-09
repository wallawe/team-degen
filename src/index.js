import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// https://github.com/callemall/material-ui/blob/master/src/styles/getMuiTheme.js
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {blueGrey700, minBlack} from 'material-ui/styles/colors';
import App from './components';
import './index.css';
// Needed for onTouchTap http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const blue = '#5C9ABE';

const muiTheme = getMuiTheme({
  // https://github.com/callemall/material-ui/blob/master/src/styles/colors.js
  palette: {
    primary1Color: blue,
    primary2Color: blueGrey700,
    // primary3Color: grey400,
    // accent1Color: pinkA200,
    // accent2Color: grey100,
    // accent3Color: grey500,
    // textColor: darkBlack,
    // secondaryTextColor: fade(darkBlack, 0.54),
    // alternateTextColor: white,
    // canvasColor: white,
    // borderColor: grey300,
    // disabledColor: fade(darkBlack, 0.3),
    // pickerHeaderColor: cyan500,
    // clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: minBlack,
  }
})

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);
