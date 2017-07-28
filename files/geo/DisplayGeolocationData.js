import React, { Component } from 'react';
import { Text } from 'react-native'
import geolocation from './geolocation'

class DisplayGeoLocationData extends Component {

  render(){
    return <Text>You are at {this.props.lat}, {this.props.lng}</Text>
  }
}


export default geolocation(DisplayGeoLocationData)
