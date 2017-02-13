import React, { Component } from 'react';
import 'css/App.css';
import LoginForm from './LoginForm';
import {Expenses, Expense, Report} from 'containers';
import {Link} from 'react-router'
import classNames from 'classnames'

function NavButton({children, to, location}) {
	const cn = classNames({active: (to==location)})
	return (<li className={cn}><Link to={to}>{children}</Link></li>)
}

class App extends Component {
  render() {
  	const location = this.props.location.pathname
    return (
      <div className="App container">
        <h1>Expenses Tracker</h1>
		<ul className="nav nav-tabs">
			<NavButton to='/expenses' location={location}>Expenses</NavButton>
		  	<NavButton to='/report' location={location}>Report</NavButton>
		</ul>
        <div className="App-body">
	        {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
