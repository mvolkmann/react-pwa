import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to My First PWA!</h1>
        </header>
        <p className="App-intro">We are about to have some fun now!</p>
        <p>Mark mode!</p>
      </div>
    );
  }
}

export default App;
