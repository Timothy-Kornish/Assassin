import React, {Component} from 'react'
import {Button, View, Text, TextInput} from 'react-native'
import {connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'
import {createroom} from '../../redux/actions'
import {apiUrl} from '../../localConfig'

class CreateRoom extends Component {

  codeGen(){
    const codeVal = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let val = ''
    for (var i = 0; i < 4; i++){
      val += codeVal[Math.floor(Math.random()* 36)]
    }
    return val
  }

 createOnClick(){
   var self = this
   const roomCode = this.codeGen()
   this.props.createroom(roomCode, self.props.username)
   fetch(apiUrl + '/room', {
     method: 'POST',
     headers: {
       "Content-Type": 'application/json',
       "x-access-token": self.props.token
     },
     body: JSON.stringify({roomCode: roomCode})
    })
    .then(() => {
      fetch(apiUrl + `/room/add`, {
        method: "PUT",
        headers: {
          "Content-Type": 'application/json',
          "x-access-token": this.props.token
        },
        body: JSON.stringify({
          username: self.props.username,
          roomCode: roomCode
        })
      })
    })
    .then(()=>{
      fetch(apiUrl + '/room/admin', {
      method: 'PUT',
      headers: {
        "Content-Type": 'application/json',
        "x-access-token": self.props.token
      },
      body: JSON.stringify({
                            username: self.props.username,
                            roomCode: roomCode
        })
      })
    })
    .then(()=>this.props.navigation.navigate('Room'))
  }

 render(){
   return(
     <View>
       <Text>Create Room</Text>
       <Button
         color= 'darkred'
        onPress={this.createOnClick.bind(this)}
        title={'Create Game'}>
      </Button>
     </View>
   )
 }
}

const mapStateToProps = (state) => {
  return {
    roomCode: state.roomCode,
    roomCreator: state.roomCreator,
    username: state.username,
    token: state.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createroom: (roomCode, username) =>{dispatch(createroom(roomCode, username))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoom)
