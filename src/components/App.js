import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import InputForm from './InputForm'
import WeatherContent from './WeatherContent'
import ForecastContent from './ForecastContent'
import LocationContent from './LocationContent'
import Spinner from './Spinner'
import { fetchLocation, geolocationError, saveHistory } from '../actions'
import  CacheManager from '../cache'

const cache  = new CacheManager;

const renderContent = (errorMessage, data) => {
    if (!errorMessage && data) {
        return(
            <div className="ui container">
                <InputForm />
                <LocationContent />
                <Tabs>
                    <TabList>
                        <Tab>Today</Tab>
                        <Tab>This week</Tab>
                    </TabList>
                    <TabPanel>
                        <WeatherContent />
                    </TabPanel>
                    <TabPanel>
                        <ForecastContent />
                    </TabPanel>
                </Tabs>
            </div>
        )
    }
    if (errorMessage && !data) {
        return (
            <div class="ui center aligned segment inverted red">
                Error: {errorMessage}
            </div>
        )            
    }
    return <Spinner message="Please accept location request" />;
}

const App = (props) => {
  //  cache.clear();
    useEffect(() => {
        window.navigator.geolocation.getCurrentPosition(
          position => props.fetchLocation(`${position.coords.latitude},${position.coords.longitude}`),
          err => props.geolocationError(err.message)
        );
        props.saveHistory();
      }, []);
    return(
        <div className="border red">{renderContent(props.errorMessage, props.location)}</div> 
    );
}

const mapStateToProps = state => {
    return {
         location: state.getIn(['weather', 'data', 'location']),
         errorMessage: state.getIn(['weather', 'errorMessage']) 
    }
}

export default connect(mapStateToProps, {fetchLocation, geolocationError, saveHistory})(App)