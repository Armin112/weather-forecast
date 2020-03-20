import React from 'react'
import { connect } from 'react-redux'
import {createSelector} from 'reselect';
import TimeAgo from 'react-timeago'

const getData = (state) => state.getIn(['weather', 'data']);

export const getStates = createSelector(
    getData,
    (list) => {
      return list
    }
 )

const LocationContent = ({data}) => {
    const location = data.get('location');
    const current = data.get('current');
        return(
            <div className="ui segment center aligned">
                <h4>Currently displayed weather for:</h4>
                <h1>{location.get('name')}</h1>
                <h3>{location.get('region')}</h3>
                <h3>{location.get('country')}</h3>
                <div className="ui secondary segment">
                    <h5>Last updated: <TimeAgo date={current.get('last_updated')}/></h5>
                </div>
            </div>
        )
}

const mapStateToProps = state => {
    return{ data: getStates(state)}
}


export default connect(mapStateToProps)(LocationContent)