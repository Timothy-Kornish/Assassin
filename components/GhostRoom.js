import React, {Component} from 'react'
import {Button, View, Text} from 'react-native'
import {connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'

export default class GhostRoom extends Component {

//need a return to lobby button

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
      <Text>told you not to get got</Text>
          <Button onPress={()=>this.props.navigation.navigate('Lobby')} title={'try again'}/>
      </View>
     )
  }
}
