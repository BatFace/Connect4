import React, { Component } from "react";
import "../css/app.css";
import Hangman from "./Hangman";
import refreshIcon from "../resources/refresh-cw.svg";

class App extends Component {
  componentDidMount() {
    this.props.loadGameStatuses();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Hangman</h1>
          <button
            title="Fetch latest game state"
            className="hangman__refresh-button"
            onClick={this.props.loadGameStatuses}
          >
            <img alt="refresh" src={refreshIcon} />
          </button>
        </header>
        <main className="game-overview">
          {this.props.statuses &&
            this.props.statuses.map(user => {
              const lettersGuessed =
                user.games[0] && user.games[0].lettersGuessed.length;
              return (
                <div
                  key={`hangman-${user._id}`}
                  className="game-overview__tile"
                >
                  <header className="game-overview__team-name">
                    <h2>{user.username}</h2>
                  </header>
                  <Hangman guessesTaken={lettersGuessed} />
                  <span>Won: {user.won}</span>
                  <span>Lost: {user.lost}</span>
                </div>
              );
            })}
        </main>
      </div>
    );
  }
}

export default App;
