import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware, push } from 'react-router-redux'
import Routes from './routes'
import  API, {loadAuth} from 'api'
import rootReducer from 'reducers'
import './index.css';

const did_load_auth = loadAuth()
let store = createStore(rootReducer, applyMiddleware(routerMiddleware(browserHistory)))
const history = syncHistoryWithStore(browserHistory, store)

if (!did_load_auth) {
	browserHistory.push('/login')
}

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			{Routes}
		</Router>
	</Provider>,
	document.getElementById('root')
);
