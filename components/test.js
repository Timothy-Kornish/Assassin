import React, {Component} from 'react'
import {Button, View, Text} from 'react-native'
import {locate} from '../redux/actions'
import {connect} from 'react-redux'


class Test extends Component {
  render(){
      return <View>
      			<Button onPress={this.props.locate} title="Locate"/>
      			<Text>testing longitude: {this.props.longitude}</Text>
      		</View>
  }
}

const mapStateToProps = (state) => {
  return {
    longitude : state.longitude,
    latitude: state.latitude
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    locate : () => {
      dispatch(locate("7777"))
    }
  }
}

const LocateConnector = connect(mapStateToProps, mapDispatchToProps)

export default LocateConnector(Test)
