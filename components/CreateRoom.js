import React, {Component} from 'react'
import {Button, View, Text, TextInput} from 'react-native'
import {connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'

class CreateRoom extends Component {
  constructor(props){
    super(props)
    this.state = {
      roomCode: ''
    }
    this.createRoom = this.createRoom.bind(this)
    this.codeGen = this.codeGen.bind(this)
  }

  codeGen(){
      //const codeGen = () => {
      const codeVal = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      let val = ''
      for (var i = 0; i < 4; i++){
        val += codeVal[Math.floor(Math.random()* 26)]
      }
      this.setState({roomCode: val})
      return val
    //}
 }

 createRoom(){

   this.codeGen()

   fetch('/room/admin', {
      method: 'PUT',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({username: this.props.username})
   })

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
     <Text>Create Room</Text>
     <Button
      onPress={() => this.createRoom()}
      title={'Create Game'}>
     </Button>
     <Text>{this.state.roomCode}</Text>
     </View>
   )
 }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    roomCode: state.roomCode
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    roomCode: () =>{dispatch({ type: 'createroom'})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoom)
