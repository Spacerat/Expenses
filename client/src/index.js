import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Router, browserHistory } from 'react-router'
import Routes from './routes'
import  API, {loadAuth} from 'api'

const did_load_auth = loadAuth()
console.log(did_load_auth ? "Auth loaded" : "nope")
if (!did_load_auth) {
	browserHistory.push('/login')
}
window.API = API
ReactDOM.render(
  <Router history={browserHistory}>
  	{Routes}
  </Router>,
  document.getElementById('root')
);
