import React, {Component} from 'react'
import {Button, View, Text, TextInput} from 'react-native'
import {connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'
import {createroom} from '../redux/actions'

class CreateRoom extends Component {
  constructor(props){
    super(props)
    this.createOnClick = this.createOnClick.bind(this)
    this.codeGen = this.codeGen.bind(this)
  }

  codeGen(){
      const codeVal = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      let val = ''
      for (var i = 0; i < 4; i++){
        val += codeVal[Math.floor(Math.random()* 26)]
      }
      return val
  }

 createOnClick(){
   const roomCode = this.codeGen()
   this.props.createroom(roomCode, 'daveEvil')
  //  fetch('/room', {
  //    method: 'POST',
  //    headers: {
  //      "Content-Type": 'application/json'
  //    },
  //    body: JSON.stringify({
  //                          username: this.props.username,
  //                          roomCode: roomCode
  //                        })
  //   })
  //   .then(()=>this.props.navigation.navigate('Room'))
  }

 render(){
   return(
     <View>
      <Text>Create Room</Text>
      <Button
        onPress={() => this.createOnClick()}
        title={'Create Game'}>
      </Button>
      <Text>{this.props.roomCode}</Text>
      <Text>{this.props.roomCreator}</Text>
     </View>
   )
 }
}

const mapStateToProps = (state) => {
  return {
    roomCode: state.roomCode,
    roomCreator: state.roomCreator,
    username: state.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createroom: (roomCode, username) =>{dispatch(createroom(roomCode, username))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoom)
