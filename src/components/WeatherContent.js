import React from 'react'
import { connect } from 'react-redux'

const renderContent = weather => {
    return(
        <div className="ui segment center aligned">
        <h4 className="ui horizontal divider header">
        <img className="ui mini image" src="https://img.icons8.com/metro/26/000000/thermometer.png"/>Temperature</h4>
        <img className="ui centered tiny image" src={weather.condition.icon} />
        <h2>{weather.temp_c}&deg;C &nbsp;&nbsp;|&nbsp;&nbsp; {weather.temp_f}&deg;F</h2>
        <h4>Humidity: {weather.humidity}%</h4>
        <h4 className="ui horizontal divider header">
        <img className="ui mini image" src="https://img.icons8.com/metro/26/000000/wind-gauge.png"/>Wind</h4>
        <h4>MPH: {weather.wind_mph}m/ph &nbsp;&nbsp;|&nbsp;&nbsp;KPH:  {weather.wind_kph}k/ph
        &nbsp;&nbsp;|&nbsp;&nbsp;Degree: {weather.wind_degree}&nbsp;&nbsp;|&nbsp;&nbsp;Direction: {weather.wind_dir}</h4>
        <h4 className="ui horizontal divider header">
        <img className="ui mini image" src="https://img.icons8.com/metro/26/000000/atmospheric-pressure.png"/>Pressure</h4>
        <h4>Normal pressure: {weather.pressure_mb}Pa &nbsp;&nbsp;|&nbsp;&nbsp;Pressure in:  {weather.pressure_in}Pa </h4>
    </div>   
    )
}

const WeatherContent = ({ weather}) => {
    return renderContent(weather)
}

const mapStateToProps = state => {
    return{ weather: state.toJS().weather.data.current}
}
export default connect(mapStateToProps)(WeatherContent)