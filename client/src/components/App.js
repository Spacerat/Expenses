import React, { Component } from 'react';
import 'css/App.css';
import LoginForm from './LoginForm';
import {Expenses} from 'containers';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Expenses Tracker</h1>
        <div className="App-body">
	        <LoginForm />
	        <Expenses />
        </div>
      </div>
    );
  }
}

export default App;
