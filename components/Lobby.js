import React, {Component} from 'react'
import {Button, View, Text} from 'react-native'
import {connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'
import JoinRoom from './Lobby-RoomComponents/JoinRoom'
import CreateRoom from './Lobby-RoomComponents/CreateRoom'
import {apiUrl} from "../localConfig"
import {joinroom} from '../redux/actions'


class Lobby extends Component {
  componentDidMount(){
    console.log("TOKEN ",this.props.token)
    fetch(apiUrl + `/showPlayersToGamesTables`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.props.token
      }
    })
    .then(response => response.json())
    .then((responseData)=>{
      console.log("responseData ", responseData)
      let checkCode = responseData.result.filter((codeObj, next) => codeObj.username === this.props.username)
      if(checkCode.length > 0){
        this.props.navigation.navigate('Game')
      }else{
        return null;
      }
    })
    .done()
  }

  render(){
    console.log("Lobby token ", this.props.token)
        return (
          <View>

            <CreateRoom {...this.props}/>
            <Text>Welcome to Assassins: The Last Heir</Text>
            <Text>create room or join room here</Text>

          <JoinRoom {...this.props}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Lobby)
