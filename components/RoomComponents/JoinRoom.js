import React, {Component} from 'react'
import {Button, View, Text, TextInput} from 'react-native'
import {connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'
import {joinroom} from '../../redux/actions'


class JoinRoom extends Component {
  constructor(props){
    super(props)
    this.state = {
      text: ''
    }
  }
  // ...put this .then before after handleOnClick dispatch (promice may be needed)


  handleOnClick(roomCode, username) {
    //if roomCode.length === 4, do this shit. otherwise, dont (and make it say something in a field. )


    // fetch('/room/add', {
    //   method: 'PUT',
    //   headers: {
    //     "Content-Type": 'application/json'
    //   },
    //   body: JSON.stringify({username: this.props.username,
    //                         roomCode: this.state.text})
    //   })
    //   .then(
    console.log('asdf', this.props, this.props.navigation);
    //this.props.navigation.navigate('Room')
      //)

    this.props.joinroom(roomCode);
  }

  render() {
    return(
      <View>
        <Text>Join a Game</Text>
        <TextInput
        style={{height:40, borderWidth: 1}}
        placeholder="Enter Room Code Here"
        onChangeText={(text) => this.setState({text})}/>
        <Button
         onPress={() => this.handleOnClick(this.state.text,this.props.username)}
         title={'Join Game'}>
        </Button>
        <Text>{this.state.text}</Text>
        <Text>{this.props.username}</Text>
        <Text>{this.props.roomCode}</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    username: 'jeffery',//state.username
    roomCode: state.roomCode,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    joinroom: (roomCode) => dispatch(joinroom(roomCode))
  }
}

const JoinRoomConnector = connect(mapStateToProps,mapDispatchToProps);


export default JoinRoomConnector(JoinRoom);
