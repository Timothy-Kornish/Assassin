import React, {Component} from 'react'
import {Button, View, Text} from 'react-native'
import {connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'

export default class Lobby extends Component {

//create a room and generate a roomcode
  createRoom (){
    return fetch('/room', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({username: this.username,
                           latitude: this.latitude,
                           longitude: this.longitude})
     })
   }

//adds user to an existing room
 joinRoom(){
   fetch('/room/add', {
     method: 'PUT',
     headers: {
       "Content-Type": 'application/json'
     },
     body: JSON.stringify({username: this.username,
                           roomCode: roomCode})
   })
 }

//logout of game
  logout(){
   fetch('/logout', {
     method: 'PUT',
     headers: {
       "Content-Type": 'application/json'
     },
     body: JSON.stringify({username: this.username})
   })
 }

  render(){
        return (
          <View>
          <Text>create room or join room here</Text>
              <Button onPress={()=>this.props.navigation.navigate('Room')} title={'Go to da room'}/>
          </View>
         )

  }
}
