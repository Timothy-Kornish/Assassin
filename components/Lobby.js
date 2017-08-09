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
          < CreateRoom {...this.props}/>
          <Text>create room or join room here</Text>
              <Button onPress={()=>this.props.navigation.navigate('Room')} title={'Go to da room'}/>
          < JoinRoom {...this.props}/>
          <Text>Text</Text>
          <Button onPress ={()=>this.props.navigation.navigate('Game')} title={'game state for compass test'}/>
          </View>
         )

  }
}
