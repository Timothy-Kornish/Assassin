import React, {Component} from 'react'
import {Button, View, Text} from 'react-native'
import {connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'
import JoinRoom from './Lobby-RoomComponents/JoinRoom'
import CreateRoom from './Lobby-RoomComponents/CreateRoom'

export default class Lobby extends Component {
  render(){
        return (
          <View>

            <CreateRoom {...this.props}/>
            <Text>Welcome to Assassins: The Last Heir</Text>
            <Text>create room or join room here</Text>

          <JoinRoom {...this.props}/>
          </View>
         )

  }
}
