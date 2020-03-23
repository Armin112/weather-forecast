import { FETCH_WEATHER, GEOLOCATION_ERROR, DISPLAY_SEARCH, SAVE_HISTORY } from '../constants'
import { fromJS, Map, List } from 'immutable';

const initialState= Map({
    errorMessage: '',
    data: List(),
    searchList: List(),
    history: List()
})

export default (state = initialState, action) => {
    switch(action.type){
        case FETCH_WEATHER:
            return state.setIn(['data'], fromJS(action.payload))

        case GEOLOCATION_ERROR:
            return state.setIn(['errorMessage'], fromJS(action.payload))

        case DISPLAY_SEARCH:
            return state.setIn(['searchList'], fromJS(action.payload))

        case SAVE_HISTORY:
            return state.setIn(['history'], fromJS(action.payload))

        default:
            return state
    }

}