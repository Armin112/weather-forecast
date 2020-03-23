import weatherApi from '../apis/weatherApi'
import { FETCH_WEATHER, GEOLOCATION_ERROR, DISPLAY_SEARCH, SAVE_HISTORY } from '../constants'
import CacheManager from '../cache'

const API_KEY = 'b18e7173ce31454e8d280457201803';

const cache = new CacheManager()

export const fetchLocation = query  => {
    return async(dispach) => {
        const response = await weatherApi.get(`/forecast.json?key=${API_KEY}&q=${query}&days=5`);
        dispach({type: FETCH_WEATHER, payload: response.data});
    }
}

export const displaySearch = query => {
    return async(dispach) => {
        const response = await weatherApi.get(`/search.json?key=${API_KEY}&q=${query}`);
        dispach({type: DISPLAY_SEARCH, payload: response.data})
    }
}


export const saveHistory = query => {
    return async(dispach) => {
        let oldData = await cache.readData('history');
        let allData = oldData;
        const newData = {name: query}
            if( oldData === null ){
                oldData = [];
            }
            if(!oldData.some(data => data.name === query) && query !== undefined){
                if(oldData.length >= 5){
                    oldData.shift();
                }
                allData =  [...oldData, newData];
                cache.writeData('history', allData) 
            }
        dispach({type: SAVE_HISTORY, payload: allData})
    }
}

export const geolocationError = error => {
    return { type: GEOLOCATION_ERROR, payload: error}
}