import React from 'react'
import { connect } from 'react-redux'
import TimeAgo from 'react-timeago'

const LocationContent = ({location, current}) => {
    return(
        <div className="ui segment center aligned">
            <h4>Currently displayed weather for:</h4>
            <h1>{location.name}</h1>
            <h3>{location.region}</h3>
            <h3>{location.country}</h3>
            <div className="ui secondary segment">
                <h5>Last updated: <TimeAgo date={current.last_updated}/></h5>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return{ location: state.toJS().weather.data.location, current: state.toJS().weather.data.current}
}


export default connect(mapStateToProps)(LocationContent)