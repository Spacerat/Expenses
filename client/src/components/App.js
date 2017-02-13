import React, { Component } from 'react';
import 'css/App.css';
import { connect } from 'react-redux'
import {Link} from 'react-router'
import classNames from 'classnames'
import {logout} from 'api'
import {browserHistory} from 'react-router'
import { fetchOwnUser } from 'actions'

function NavButton({children, to, location}) {
  const cn = classNames({active: (to===location)})
  return (<li className={cn}><Link to={to}>{children}</Link></li>)
}

class App extends Component {
  handleLogout = () => {
    logout()
    browserHistory.push('/login')
  }
  componentDidMount() {
    this.props.fetchOwnUser()
  }
  render() {
    const location = this.props.location.pathname
    console.log(this.props)
    return (
      <div className="App container">
        <h1>Expenses Tracker</h1>
        {location === '/login' ? null :
        <ul className="nav nav-tabs">
              <NavButton to='/expenses' location={location}>Expenses</NavButton>
              <NavButton to='/report' location={location}>Report</NavButton>
              {!this.props.user.is_staff ? null : <NavButton to='/users' location={location}>Admin</NavButton>}
        </ul>
        }
        <div className="App-body">
          {this.props.children}
        </div>
        {location === '/login' ? null : <button className='btn btn-default' type="button" onClick={this.handleLogout}>Logout</button> }
      </div>
    );
  }
}

export default connect(
  ({user}) => ({user}),
  {fetchOwnUser}
)(App);
