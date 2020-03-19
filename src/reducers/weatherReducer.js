import { FETCH_WEATHER, GEOLOCATION_ERROR, DISPLAY_SEARCH } from '../constants'
import Immutable from 'immutable';

const initialState= Immutable.fromJS({
    errorMessage: '',
    data: null,
    searchList: []
})

export default (state = initialState, action) => {
    switch(action.type){
        case FETCH_WEATHER:
            return state.set('data', action.payload)

        case GEOLOCATION_ERROR:
            return state.set('errorMessage', action.payload)

        case DISPLAY_SEARCH:
            return state.set('searchList', action.payload)

        default:
            return state
    }

}