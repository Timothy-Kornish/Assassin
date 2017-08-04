import React, {Component} from 'react'
import {Button, View, Text, TextInput} from 'react-native'
import {connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'

class JoinRoom extends Component {
  constructor(props){
    super(props)
    this.state = {
      text: ''
    }
    this.joinRoom = this.joinRoom.bind(this)
  }

 joinRoom(){
   fetch('/room/add', {
     method: 'PUT',
     headers: {
       "Content-Type": 'application/json'
     },
     body: JSON.stringify({username: this.props.username,
                           roomCode: this.state.text})
   }).then(
        ()=>this.props.navigation.navigate('Room')
      )
 }

 render(){
   return(
     <View>
     <Text>Join Room</Text>
     <TextInput
     style={{height:40, borderWidth: 1}}
     placeholder="Enter Room Code Here"
     onChangeText={(text) => this.setState({text})}/>
     <Button
      onPress={() => this.joinRoom()}
      title={'Join Game'}>
     </Button>
     <Text>{this.props.username}</Text>
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
    roomCode: () =>{dispatch({ type: 'joinroom'})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinRoom)
