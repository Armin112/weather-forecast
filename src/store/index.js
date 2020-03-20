import { createStore, applyMiddleware, compose } from 'redux'
import reducers from '../reducers'
import reduxThunk from 'redux-thunk'
import { loadState } from '../components/localStorage'

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));

export default store;