import React, {Component} from 'react'
import {Button, View, Text} from 'react-native'
import {locate} from '../redux/actions'
import {connect} from 'react-redux'


class LocationWatcher extends Component {

  componentDidMount() {
   		this.processId = setInterval (() => navigator.geolocation.getCurrentPosition(
      		(position) => this.props.locate(position.coords.latitude, position.coords.longitude),
     		(error) => this.props.locate(null, null, error.message),
      		{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    	), 3000);  
  }

  componentWillUnmount() {
    //navigator.geolocation.clearWatch(this.watchId);
  	clearInterval(this.processId)
  }
  
  render(){
      return (<View>
      			<Text>testing longitude: {this.props.longitude}</Text>
      			<Text>testing latitude: {this.props.latitude}</Text>
      		</View>)
  }
}

const mapStateToProps = (state) => {
  return {
    longitude: state.longitude,
    latitude: state.latitude
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    locate : (latitude, longitude, error) => {
      dispatch(locate(latitude, longitude, error))
    }
  }
}

const LocateConnector = connect(mapStateToProps, mapDispatchToProps)

export default LocateConnector(LocationWatcher)
