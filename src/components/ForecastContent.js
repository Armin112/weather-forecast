import React from 'react'
import Moment from 'react-moment';
import { connect } from 'react-redux'

const renderSingleDay = (data) => {
    const { day } = data;
    return(
        <div className="column" key={data.date}>
            <div className="ui segment center aligned">
                <h5 className="ui secondary segment"><Moment local format="DD/MM/YYYY">{data.date}</Moment></h5>
                <img className="ui centered tiny image" src={day.condition.icon} />
                <h3>{day.avgtemp_c}&deg;C &nbsp;&nbsp;|&nbsp;&nbsp; {day.avgtemp_f}&deg;F</h3>
                <h5>Humidity: {day.avghumidity}%</h5>
                <h5 className="ui horizontal divider header">
                <img className="ui mini image" src="https://img.icons8.com/metro/26/000000/wind-gauge.png"/>Wind</h5>
                <h4>MPH: {day.maxwind_mph}m/ph &nbsp;&nbsp;|&nbsp;&nbsp;KPH:  {day.maxwind_kph}k/ph</h4>
            </div>
        </div>
    )
}

const ForecastContent = ({forecast}) => {
    return(
        <div class="ui grid">
            <div className="five column row">
            {forecast.forecastday.map(data => {
                return renderSingleDay(data);
            })}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return{ forecast: state.toJS().weather.data.forecast}
}

export default connect(mapStateToProps)(ForecastContent)