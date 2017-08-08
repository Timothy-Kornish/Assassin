import React, {Component} from 'react'
import {Button, View, Text, FlatList} from 'react-native'
import {connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'
import { newPlayersWaiting } from '../redux/actions'

class Room extends Component {

//the room creator needs to be able to start the game and
//send all to the loading page,
 pressButton(){
    fetch('/room/', {
     method: 'PUT',
     headers: {
       'Content-Type': 'application/json'
     },
        body: JSON.stringify({
          token: this.props.token,
          roomCode: this.props.roomCode
        })
     })
      .then((response) => {
        if (response.status === 200){
          this.props.navigation.navigate('Loading')
        }
     })
  }

  updatePlayers(){
    fetch(`/room/players?room=${this.props.roomCode}`, { // Dopu
     method: 'GET',
     headers: {
       'Content-Type' : 'application/json',
       'x-access-token' : this.props.token
     }
    })
    .then(response => response.json())
    .then(result => this.props.playersWaiting(result.players, result.creator))
  }

  componentDidMount(){
    this.interval = setInterval(this.updatePlayers.bind(this), 3000)
  }

  componentWillUnmount(){
    stopInterval(this.interval)
  }

  render(){
    const players = this.props.waitingPlayers.map(username => ({ key: username }))
    return (
        <View>
          <Text>Total Player: {players.length}</Text>
          <FlatList data={ players } renderItem={ (player) => <Text>{player.key}</Text>} />
          <Text>wait for your targets</Text>
          {this.props.roomCreator === this.props.username ? <Button onPress={this.pressButton.bind(this)} title={'start game'}/>
                                                           : <Text>Waiting for {this.props.roomCreator} to start the game</Text>}
        </View>
    )
  }
}


const mapStateToProps = (state) => ({
  token : state.token,
  roomCode: state.roomCode,
  waitingPlayers: state.waitingPlayers,
  roomCreator: state.roomCreator,
  username: state.username
})

const mapDispatchToProps = (dispatch) => {
  playersWaiting : (players) => {dispatch(newPlayersWaiting(players))};
}
// ^this is our last console error... guessing because we don't have list of players yet?

const RoomConnector = connect(mapStateToProps, mapDispatchToProps)

export default RoomConnector(Room)
