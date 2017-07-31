import React, {Component} from 'react'
import {Button, View, Text} from 'react-native'
import {findLocation} from '../redux/actions'
import {connect} from 'react-redux'

class Geolocate extends Component {


  location(){

    watchId = navigator.geolocation.watchPosition(

      (position) => {
        console.log("latitude:", position.coords.latitude)
        console.log("longitude", position.coords.longitude)
        let obj = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        }

      },
      (error) => { error: error.message },

     { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000},

    );

  }

  componentDidMount() {
    this.location()
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }


  render(){ 
    return <View>
      <Text>Latitude: {this.props.latitude}</Text>
      <Text>Longitude: {this.props.longitude}</Text>
      {this.props.error ? <Text>Error: {this.props.error}</Text> : null}
    </View>
  }
}

const mapStateToProps = (state) => {
  return {
    longitude: state.longitude,
    latitude: state.latitude,
    watchId: state.watchId,
    error: state.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    locate : () => {
      dispatch(locate(longitude, latitude))
    }
  }
}


const GeolocateConnector = connect(mapStateToProps, mapDispatchToProps)

export default GeolocateConnector(Geolocate)

