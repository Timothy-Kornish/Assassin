import React, {Component} from 'react'
import {Button, View, Text} from 'react-native'
import {connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'

export default class Loading extends Component {


  startGame(){
    fetch('/room/start', {
     method: 'PUT',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({roomCode: this.roomCode})
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
      <Text>LOADING!!!!!</Text>
          <Button onPress={()=>this.props.navigation.navigate('Game')} title={'Go to the game for realz'}/>
      </View>
     )
  }
}
