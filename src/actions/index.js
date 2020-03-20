import weatherApi from '../apis/weatherApi'
import { FETCH_WEATHER, GEOLOCATION_ERROR, DISPLAY_SEARCH, SAVE_HISTORY } from '../constants'

const API_KEY = 'b18e7173ce31454e8d280457201803';

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

export const saveHistory = data => {
    return { type: SAVE_HISTORY, payload: {name: data}}
}

export const geolocationError = error => {
    return { type: GEOLOCATION_ERROR, payload: error}
}