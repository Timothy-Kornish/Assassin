import React, {Component} from 'react'
import {Button, View, Text} from 'react-native'
import {connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'

export default class Room extends Component {



//the room creator needs to be able to start the game and
//send all to the loading page,



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
        <Text>wait for your targets</Text>
            <Button onPress={()=>this.props.navigation.navigate('Loading')} title={'start game'}/>
        </View>
    )
  }
}
