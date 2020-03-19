import React from 'react'
import InputForm from './InputForm'
import WeatherContent from './WeatherContent'
import ForecastContent from './ForecastContent'
import LocationContent from './LocationContent'
import Spinner from './Spinner'
import { connect } from 'react-redux'
import { fetchLocation, geolocationError } from '../actions'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
class App extends React.Component{

    componentDidMount(){
        window.navigator.geolocation.getCurrentPosition(
            position =>  this.props.fetchLocation(`${position.coords.latitude},${position.coords.longitude}`),
            err => this.props.geolocationError(err.message)
          );  
    }

    renderContent({errorMessage, data}){
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
    render(){
        return(
            <div className="border red">{this.renderContent(this.props.location)}</div> 
        );
    }
}

const mapStateToProps = state => {
    return { location: state.toJS().weather }
}

export default connect(mapStateToProps, {fetchLocation, geolocationError})(App)