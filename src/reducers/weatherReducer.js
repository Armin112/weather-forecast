import { FETCH_WEATHER, GEOLOCATION_ERROR, DISPLAY_SEARCH, SAVE_HISTORY } from '../constants'
import { fromJS, Map, List } from 'immutable';
import CacheManager from '../cache'
import localforage from 'localforage'

const cache = new CacheManager()

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
            localforage.getItem('history').then(function(oldData) {
                const newState = state.mergeIn(['history'], fromJS(action.payload))
                const newData = action.payload;
                if( oldData === null ){
                    oldData = []
                }
                cache.writeData('history', [...oldData, newData]) 
                return newState  
                }).catch(function(err) {
                    console.log(err);
                });                    
           
            
        default:
            return state
    }

}