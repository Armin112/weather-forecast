import React from 'react'
import Moment from 'react-moment';
import {createSelector} from 'reselect';
import { connect } from 'react-redux'

const getData = (state) => state.getIn(['weather', 'data', 'forecast']);

export const getStates = createSelector(
    getData,
    (list) => {
      return list
    }
 )

const renderSingleDay = (data) => {
    const day = data.get('day');
    return(
        <div className="column" key={data.get('date')}>
            <div className="ui segment center aligned">
                <h5 className="ui secondary segment"><Moment local format="DD/MM/YYYY">{data.get('date')}</Moment></h5>
                <img className="ui centered tiny image" src={day.get('condition').get('icon')} alt="Condition"/>
                <h3>{day.get('avgtemp_c')}&deg;C &nbsp;&nbsp;|&nbsp;&nbsp; {day.get('avgtemp_f')}&deg;F</h3>
                <h5>Humidity: {day.get('avghumidity')}%</h5>
                <h5 className="ui horizontal divider header">
                <img className="ui mini image" src="https://img.icons8.com/metro/26/000000/wind-gauge.png" alt="Wind"/>Wind</h5>
                <h4>MPH: {day.get('maxwind_mph')}m/ph &nbsp;&nbsp;|&nbsp;&nbsp;KPH:  {day.get('maxwind_kph')}k/ph</h4>
            </div>
        </div>
    )
}

const ForecastContent = ({forecast}) => {
    return(
        <div className="ui grid">
            <div className="five column row">
            {forecast.get('forecastday').map(data => {
                return renderSingleDay(data);
            })}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return{ forecast: getStates(state)}
}

export default connect(mapStateToProps)(ForecastContent)