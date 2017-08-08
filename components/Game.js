<<<<<<< HEAD

import React, {Component} from 'react'
import {Button, View, Text, TouchableOpacity} from 'react-native'
=======
import React, {Component} from 'react'
import {Button, View, Text} from 'react-native'
>>>>>>> 62023b835aec4aebd7b431267c2a481bc897413b
import {connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'

export default class Game extends Component {
<<<<<<< HEAD
//   constructor(props){
//     super(props)
//     this.state = {
//       latitude: ' ',
//       longitude: ' ',
//       roomCode: ' ',
//       username: ' ',
//       targets: ' ',
//       compass: ' '
//
//     }
//
//   }
//
// Alert = () => {
//   const showAlert = () => {
//       Alert.alert(
//          'WARNING!',
//          'AN ASSASSIN IS NEARBY!!!!!!!'
//       )
//    }
//
//    return (
//       <TouchableOpacity onPress = {showAlert} style = {styles.button}>
//         <Text>RUN!!!</Text>
//       </TouchableOpacity>
//    )
// }

kill(){
=======


  kill(){
>>>>>>> 62023b835aec4aebd7b431267c2a481bc897413b
    fetch('/user/kill', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({latitude: this.latitude,
                           longitude: this.longitude})
    })
<<<<<<< HEAD



=======
>>>>>>> 62023b835aec4aebd7b431267c2a481bc897413b
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

<<<<<<< HEAD


=======
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
>>>>>>> 62023b835aec4aebd7b431267c2a481bc897413b

  render(){
    return (
      <View>
<<<<<<< HEAD
        <Text>DONT GET GOT, also look! a compass!</Text>

=======
      <Text>DONT GET GOT, also look! a compass!</Text>
>>>>>>> 62023b835aec4aebd7b431267c2a481bc897413b
        <Button onPress={()=>this.props.navigation.navigate('GhostRoom')} title={'you got got'}/>
      </View>
     )
  }
}
