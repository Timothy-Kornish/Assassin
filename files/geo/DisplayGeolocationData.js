import React, { Component } from 'react';
import { Text } from 'react-native'
import AutoLocate from './AutoLocate'

class DisplayGeoLocationData extends Component {

  render(){
    return <Text>Here you are: {this.state.lat}, {this.state.lng}</Text>
  }
}


export default geolocation(DisplayGeoLocationData)
