import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import {createSelector} from 'reselect';
import CacheManager from '../cache'
import { fetchLocation, displaySearch, saveHistory } from '../actions'
import localforage from 'localforage'

const cache = new CacheManager();

const getData = (state) => state.getIn(['weather', 'searchList']);

export const getStates = createSelector(
    getData,
    (list) => {
      return list
    }
 )

 const renderHistory  = () => {
     let data; 
    localforage.getItem('history').then(function (value) {
        data = value;
        return (
            <div>
                <ul> 
                    {value.map(l => (
                        <li>{console.log(l)}{l.name}</li>
                    ))}
                </ul>
            </div>
        )
    }).catch(function(err) {
        console.error(err);
    });
    console.log(data)
}


const InputForm = (props) =>  {
    const [query, setQuery] = useState('');
    const [displayList, setDisplayList] = useState(false);
    const node = useRef();

   const onSubmit = (e) => {
        e.preventDefault();
        props.fetchLocation(query)
    }

    const onClickList = async (query) => {
        props.fetchLocation(query) 
        props.saveHistory(query)
        setQuery('');
        setDisplayList(false)
    }

   const  handleChange = (event) => {
        setQuery(event.target.value);
        if(query.length > 3){
            setDisplayList(true);
            props.displaySearch(query)
        }
    }

    const handleClickOutside = e => {
        if (node.current.contains(e.target)) {
            return;
          }
          setDisplayList(false)
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return() => {
        document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []
    )
    
    const renderList = (props) => {
        return(
            <div className="location-list">
                <ul className="ui divided items">
                    {props.list.size > 0 && props.list.map(location => {
                        return(
                            <li className="item" key={location.get('id')} onClick={() => onClickList(location.get('name'))}>{location.get('name')}</li>
                        )
                    })}
                    {props.list.size === 0 && (
                        <p>No location found.</p>
                    )}
                </ul>
            </div>
        )
    }
    
   
    return(
        <div className="ui placeholder segment">
            <div className="ui two column stackable center aligned grid">
            <div className="ui vertical divider">Or</div>
                <div className="middle aligned row">
                    <div className="column">
                        <div className="ui icon header"><i className="search icon"></i>Enter city name</div>
                        <div className="field">
                            <div ref={node} className="ui search">
                                <form className="ui icon input" onSubmit={onSubmit} autoComplete="off">
                                    <input className="" type="text" name="query" placeholder="Search..." onChange={handleChange} value={query}/>
                                    <button className="ui primary button" type="submit"><i className="search icon"></i></button>
                                </form>
                                {displayList && renderList(props)}
                            </div>
                        </div>
                    </div>

                    <div className="column">
                        <div className="ui icon header"><i className="world icon"></i>Browse history</div>
                        <div className="field">
                            {renderHistory()}
                        </div>
                    </div>

                </div>
            </div>
        </div>
        )
    }

const mapStateToProps = state => {
    return { list: getStates(state) }
}

export default connect(mapStateToProps, {fetchLocation, displaySearch, saveHistory})(InputForm)