import React from 'react'
import {createSelector} from 'reselect';
import { connect } from 'react-redux'

const getData = (state) => state.getIn(['weather', 'data', 'current']);

export const getStates = createSelector(
    getData,
    (list) => {
      return list
    }
 )

const WeatherContent = ({ weather}) => {
    return (
        <div className="ui segment center aligned">
            <h4 className="ui horizontal divider header">
            <img className="ui mini image" src="https://img.icons8.com/metro/26/000000/thermometer.png"/>Temperature</h4>
            <img className="ui centered tiny image" src={weather.get('condition').get('icon')}/>
            <h2>{weather.get('temp_c')}&deg;C &nbsp;&nbsp;|&nbsp;&nbsp; {weather.get('temp_f')}&deg;F</h2>
            <h4>Humidity: {weather.get('humidity')}%</h4>
            <h4 className="ui horizontal divider header">
            <img className="ui mini image" src="https://img.icons8.com/metro/26/000000/wind-gauge.png"/>Wind</h4>
            <h4>MPH: {weather.get('wind_mph')}m/ph &nbsp;&nbsp;|&nbsp;&nbsp;KPH: {weather.get('wind_kph')}k/ph
            &nbsp;&nbsp;|&nbsp;&nbsp;Degree: {weather.get('wind_degree')}&nbsp;&nbsp;|&nbsp;&nbsp;Direction: {weather.get('wind_dir')}</h4>
            <h4 className="ui horizontal divider header">
            <img className="ui mini image" src="https://img.icons8.com/metro/26/000000/atmospheric-pressure.png"/>Pressure</h4>
            <h4>Normal pressure: {weather.get('pressure_mb')}Pa &nbsp;&nbsp;|&nbsp;&nbsp;Pressure in: {weather.get('pressure_in')}Pa </h4>
        </div>   
    );
}

const mapStateToProps = state => {
    return{ weather: getStates(state)}
}
export default connect(mapStateToProps)(WeatherContent)