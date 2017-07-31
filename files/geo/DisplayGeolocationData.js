import React, { Component } from 'react';
import { Text } from 'react-native'
import geolocation from './geolocation'

class DisplayGeoLocationData extends Component {

  render(){
    return <Text>You are at {this.props.latitude}, {this.props.longitude}</Text>
  }
}


export default geolocation(DisplayGeoLocationData)
