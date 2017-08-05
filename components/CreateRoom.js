import React, {Component} from 'react'
import {Button, View, Text, TextInput} from 'react-native'
import {connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'

class CreateRoom extends Component {
  constructor(props){
    super(props)
    this.state = {
      text: '',
      roomCode: ''
    }
    this.createRoom = this.createRoom.bind(this)
  }

  componentDidMount(){
    codeGen(){
      const codeVal = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      let val = ''
      for (var i = 0; i < 4; i++){
        val += codeVal[Math.floor(Math.random()* 26)]
      }
      this.setState({roomCode: val})
      return val
    }
 }

 createRoom(){
   fetch('/room', {
     method: 'POST',
     headers: {
       "Content-Type": 'application/json'
     },
     body: JSON.stringify({username: this.props.username,
                           roomCode: this.state.roomCode})
   }).then(
        ()=>this.props.navigation.navigate('Room')
      )
 }

 render(){
   return(
     <View>
     <Text>Join Room</Text>
     <Button
      onPress={() => this.createRoom()}
      title={'Join Game'}>
     </Button>
     </View>
   )
 }
}

const mapStateToProps = (state) => {
  return {
    username: state.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    roomCode: () =>{dispatch({ type: 'createroom'})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinRoom)
