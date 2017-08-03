import React, {Component} from 'react'
import {Button, View, Text} from 'react-native'
import {connect} from 'react-redux'

class Lobby extends Component {

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
              <Text>{text}</Text>
              <Button onPress={()=>props.navigation.navigate(link)} title={'Go to ' + link}/>
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
