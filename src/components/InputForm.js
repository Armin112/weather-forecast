import React from 'react'
import { connect } from 'react-redux'
import { fetchLocation, displaySearch } from '../actions'

class InputForm extends React.Component {
    state = {query: '', displayList: false}

    onSubmit = (e) => {
        e.preventDefault();
        this.props.fetchLocation(this.state.query)
    }

    onClickList = (query) => {
        this.props.fetchLocation(query) 
        this.setState({
            displayList: false,
            query: ''
        })
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        if(this.state.query.length > 3){
            this.setState({
                displayList: true,
            })
            this.props.displaySearch(this.state.query)
        }
    }

    componentDidMount(){
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef = (node) => {
        this.wrapperRef = node;
    }

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({
                displayList: false,
            })
        }
    }
    
    renderList(){
        return(
            <div className="location-list">
                <ul className="ui divided items">
                    {this.props.list.length > 0 && this.props.list.map(location => {
                        return(
                            <li className="item" key={location.id} onClick={() => this.onClickList(location.name)}>{location.name}</li>
                        )
                    })}
                    {this.props.list.length === 0 && (
                        <p>No location found.</p>
                    )}
                </ul>
            </div>
        )
    }

    render(){
        return(
            <div className="ui placeholder segment">
                <div className="ui one column stackable center aligned grid">
                    <div className="middle aligned row">
                        <div className="column">
                            <div className="ui icon header"><i className="search icon"></i>Enter city name</div>
                            <div className="field">
                                <div ref={this.setWrapperRef} className="ui search">
                                    <form className="ui icon input" onSubmit={this.onSubmit} autoComplete="off">
                                        <input className="" type="text" name="query" placeholder="Search..." onChange={this.handleChange} />
                                        <button className="ui primary button" type="submit"><i className="search icon"></i></button>
                                    </form>
                                    {this.state.displayList && this.renderList()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { list: state.toJS().weather.searchList}
}

export default connect(mapStateToProps, {fetchLocation, displaySearch})(InputForm)