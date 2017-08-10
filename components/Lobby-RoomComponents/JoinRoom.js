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
   Promise.resolve(this.props.joinroom(this.state.text))
   .then(fetch(apiUrl + '/room/add', {
          method: 'PUT',
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({username: this.props.username,
                           roomCode: this.state.text})
    }))
    .then(()=>this.props.navigation.navigate('Room'))
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
    roomCode: state.roomCode
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    joinroom: (roomCode) =>{dispatch(joinroom(roomCode))}
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(JoinRoom)
