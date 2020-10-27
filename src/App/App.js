import React, { Component } from 'react';
import './App.scss';
import Group from './conponent/Group';
import Student from './conponent/Student';

class App extends Component {
  render() {
    return (
      <div data-testid="app" className="App">
        <Group />
        <Student />
      </div>
    );
  }
}

export default App;
