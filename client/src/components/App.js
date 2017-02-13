import React, { Component } from 'react';
import 'css/App.css';
import {Link} from 'react-router'
import classNames from 'classnames'
import {logout} from 'api'
import {browserHistory} from 'react-router'

function NavButton({children, to, location}) {
	const cn = classNames({active: (to===location)})
	return (<li className={cn}><Link to={to}>{children}</Link></li>)
}

class App extends Component {
  handleLogout = () => {
    logout()
    browserHistory.push('/login')
  }
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
        {location == '/login' ? null : <button className='btn btn-default' type="button" onClick={this.handleLogout}>Logout</button> }
      </div>
    );
  }
}

export default App;
