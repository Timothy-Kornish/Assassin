import React, {Component} from 'react'
import {Button, View, Text} from 'react-native'
import {connect} from 'react-redux'

export default class Game extends Component {
  

  kill(){
    fetch('/user/kill', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({latitude: this.latitude,
                           longitude: this.longitude})
    })
  }

  locationUpdate(){
    fetch('/user/location', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({latitude: this.latitude,
                           longitude: this.longitude})
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
          <Text>{text}</Text>
          <Button onPress={()=>props.navigation.navigate(link)} title={'Go to ' + link}/>
      </View>
     )
  }
}
