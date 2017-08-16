import React, {Component} from 'react'
import {Button, View, Text, TextInput, Alert} from 'react-native'
import {connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'
import {joinroom} from '../../redux/actions'
import {apiUrl} from '../../localConfig'

class JoinRoom extends Component {

  constructor(props){
    super(props)
    this.state = {
      text: ''
    }
    this.joinOnClick = this.joinOnClick.bind(this)
  }

 joinOnClick(){
  var self = this;
  self.props.joinroom(self.state.text, self.props.username)
  fetch(apiUrl + `/showGamesTables`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': self.props.token
    }
  })
  .then(response => response.json())
  .then((responseData)=>{
    let checkCode = responseData.result.filter((codeObj, next) => codeObj.roomCode === self.state.text)
    if(checkCode.length > 0){
      self.props.navigation.navigate('Room')
    }else{
      Alert.alert('sorry', 'This room code does not exist')
    }
  })
  .then(() => {
    fetch(apiUrl + `/room/add`, {
      method: "PUT",
      headers: {
        "Content-Type": 'application/json',
        "x-access-token": self.props.token
      },
      body: JSON.stringify({
        username: self.props.username,
        roomCode: self.state.text
      })
    })
  })
}

 render(){
   return(
     <View>
       <Text>Join Room</Text>
       <TextInput
         style={{height:40, borderWidth: 1, backgroundColor: "white"}}
         autoCapitalize ="characters"
         placeholder="Enter Room Code Here"
         onChangeText={(text) => this.setState({text})}/>
       <Button
         color= 'darkred'
        onPress={() => this.joinOnClick()}
        title={'Join Game'}>
      </Button>
     </View>
   )
 }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    roomCode: state.roomCode,
    token: state.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    joinroom: (roomCode, username) =>{dispatch(joinroom(roomCode, username))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinRoom)
