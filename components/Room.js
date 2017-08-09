import React, {Component} from 'react'
import {Button, View, Text, FlatList, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'
import {newPlayersWaiting} from '../redux/actions'

let startTime = Date.now()

class Room extends Component {

  let url = "http://192.168.137.249:3001"

 pressButton(){
    fetch(url + '/room/start', {
     method: 'PUT',
     headers: {
       'Content-Type': 'application/json'
     },
        body: JSON.stringify({
          //token: this.props.token,
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

    fetch(url + `/user/list/?room=${this.props.roomCode}`, {
     method: 'GET',
     headers: {
       'Content-Type' : 'application/json',
       'x-access-token' : this.props.token
     }
    })
    .then(response => response.json())
    .then(result => this.props.playersWaiting(result.players, result.creator))
    //this.props.playersWaiting(['Lauren','El Timo','Shannon','Kelsey'], 'Lauren');
    console.log('updatePlayers is firing with', this.props.playersWaiting, (Date.now() - startTime) /1000);
   }

  componentDidMount(){
    this.interval = setInterval(this.updatePlayers.bind(this), 3000)
    console.log("interval is firing every 3 seconds", (Date.now() - startTime) /1000)
  }

  componentWillUnmount(){
    stopInterval(this.interval)
  }

  render(){
    const names = this.props.waitingPlayers.map(name => (<Text> {name + '\n'} </Text>))
    console.log("you son of a render", this.props.waitingPlayers)
    return (
      <View>
        <View>
        <Text>Total Player: {this.props.waitingPlayers.length}</Text>

        </View>
        <Text>{names}</Text>

        <View>
          <Button onPress={this.pressButton.bind(this)} title={'start game'}/>

        </View>
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

const mapDispatchToProps = (dispatch) => ({
  playersWaiting : (players, creator) => {dispatch(newPlayersWaiting(players, creator))}
})

const RoomConnector = connect(mapStateToProps, mapDispatchToProps)

export default RoomConnector(Room)
