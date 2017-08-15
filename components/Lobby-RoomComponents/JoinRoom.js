import React, {Component} from 'react'
import {Button, View, Text, TextInput} from 'react-native'
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
  if(!self.state.roomCode){
    console.log("Join On Click fired and kels is ", self.props.username)
    self.props.joinroom(self.state.text, self.props.username)
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
    .then((response)=>{
      console.log("Room add res ", response.json())
      console.log("Navigating to Room")
      self.props.navigation.navigate('Room')
    })
  }else{
    Alert.alert('sorry', 'This room code does not exist')
  }

 }

 render(){
   return(
     <View>
       <Text>Join Room</Text>
       <TextInput
         style={{height:40, borderWidth: 1}}
         autoCapitalize ="characters"
         placeholder="Enter Room Code Here"
         onChangeText={(text) => this.setState({text})}/>
       <Button
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
