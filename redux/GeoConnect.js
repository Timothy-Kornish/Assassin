
import React, {Component} from 'react'
import {Button, View, Text} from 'react-native'
import {locate} from '../redux/actions'
import {connect} from 'react-redux'
import locate from './redux/actions'

class GeoConnect extends Component {
  componentDidMount() {
    this.processId = setInterval(() => navigator.geolocation.getCurrentPosition(
      (position) => {
        this.props.locate(position.coords.latitude, position.coords.longitude),
        (error) => this.props.locate(null, null, error.message ),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000},
      ))
      );
}

componentWillUnmount() {
  navigator.geolocation.clearWatch(this.watchId);
}

render() {
  return
    <View>
      <Button onPress={this.props.locate} title="Locate"/>
      <Text> You are here: {this.props.latitude, this.props.longitude}</Text>
    </View>

  }
}


const mapStateToProps = (state) => {
  return {
    longitude : state.longitude,
    latitude: state.latitude,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    locate: (latitude, longitude, error) => {
      dispatch(locate("42, the answer", longitude, latitude, error))


    }
  }

  }




const LocateConnector = connect(mapStateToProps, mapDispatchToProps)

export default LocateConnector(GeoConnect)
