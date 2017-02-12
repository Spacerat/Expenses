import React, { Component } from 'react';
import 'css/App.css';
import LoginForm from './LoginForm';
import {Expenses, Expense, Report} from 'containers';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <h1>Expenses Tracker</h1>
        <div className="App-body">
	        <LoginForm />
	        <Expenses />
	        <Expense />
	        <Report />
        </div>
      </div>
    );
  }
}

export default App;
