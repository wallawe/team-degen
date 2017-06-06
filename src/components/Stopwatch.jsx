import React from 'react';

const formatSeconds = (sec) => {
  return Math.floor(sec / 60) + ':' + ('0' + sec % 60).slice(-2)
}

export default class Stopwatch extends React.Component {
  constructor() {
    super();

    this.state = {
      secondsElapsed: 0,
      lastClearedIncrementer: null
    };

    this.incrementer = null;
  }

  start() {
    this.incrementer = setInterval( () => {
      this.setState({
        secondsElapsed: this.state.secondsElapsed + 1
      });
    }, 1000);
  }

  stop() {
    clearInterval(this.incrementer);
    this.setState({
      lastClearedIncrementer: this.incrementer
    });
  }

  reset() {
    clearInterval(this.incrementer);
    this.setState({
      secondsElapsed: 0
    });
  }

  componentWillUnmount() {
    clearInterval(this.incrementer);
  }

  render() {
    return (
      <div>
        {formatSeconds(this.state.secondsElapsed)}

        {(this.state.secondsElapsed === 0 ||
          this.incrementer === this.state.lastClearedIncrementer
          ? <button className="start-btn" onClick={this.start.bind(this)}>start</button>
          : <button className="stop-btn" onClick={this.stop.bind(this)}>stop</button>
        )}

        {(this.state.secondsElapsed !== 0 &&
          this.incrementer === this.state.lastClearedIncrementer
          ? <button onClick={this.reset.bind(this)}>reset</button>
          : null
        )}

      </div>
    );
  }
}