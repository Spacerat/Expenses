import React from 'react';
import ReactDOM from 'react-dom';
import {App} from 'components';
import './index.css';
import { Router, browserHistory } from 'react-router'
import Routes from './routes'
import  {login} from 'api/'

login('Bob', 'bobsburgers')
ReactDOM.render(
  <Router history={browserHistory}>
  	{Routes}
  </Router>,
  document.getElementById('root')
);
