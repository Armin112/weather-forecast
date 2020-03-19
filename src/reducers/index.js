import { combineReducers } from 'redux-immutable'
import weatherReducer from './weatherReducer'
export default combineReducers({
    weather: weatherReducer,
})