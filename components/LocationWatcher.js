import React, {Component} from 'react'
import {Button, View, Text} from 'react-native'
import {connect} from 'react-redux'

class LocationWatcher extends Component {
  render(){
    console.log(this.props.longitude)
      return (
        <View>
      		<Text>testing longitude: {this.props.longitude}</Text>
      		<Text>testing latitude: {this.props.latitude}</Text>
      	</View>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    longitude: state.longitude,
    latitude: state.latitude
  }
}

const LocateConnector = connect(mapStateToProps)

export default LocateConnector(LocationWatcher)
