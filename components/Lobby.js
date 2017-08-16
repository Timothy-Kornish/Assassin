import React, {Component} from 'react'
import {Button, View, Text, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'
import JoinRoom from './Lobby-RoomComponents/JoinRoom'
import CreateRoom from './Lobby-RoomComponents/CreateRoom'

export default class Lobby extends Component {
  render(){
        return (
          <View style = {styles.container}>
            <CreateRoom {...this.props}/>
            <Text style = {styles.words}>Welcome to Assassins: The Last Heir</Text>
            <Text style = {styles.words}>create room or join room here</Text>
            <JoinRoom {...this.props}/>
          </View>
         )
  }
}
var styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  words: {
    color: 'white',
  }
})
