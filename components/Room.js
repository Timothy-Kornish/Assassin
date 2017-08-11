import React, {Component} from 'react'
import {Button, View, Text, FlatList, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'
import {newPlayersWaiting} from '../redux/actions'
import {newAssignTarget} from '../redux/actions'
import {apiUrl} from '../localConfig'

let startTime = Date.now()

class Room extends Component {

  componentDidMount(){
      this.interval = setInterval(this.updatePlayers.bind(this), 3000)
      console.log("interval is firing every 3 seconds", (Date.now() - startTime) /1000)
    }

  updatePlayers(){
    fetch(apiUrl + `/user/list/${this.props.roomCode}`, {
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

  componentWillUnmount(){
    clearInterval(this.interval)
  }

 pressButton(){

    fetch(apiUrl + '/room/start', {
     method: 'PUT',
     headers: {
       'Content-Type': 'application/json'
     },
        body: JSON.stringify({
          //token: this.props.token,
          roomCode: this.props.roomCode
        })
     })
    .then(()=> {
      fetch(apiUrl + `/user/targets`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          roomCode: this.props.roomCode
        })
      })
    })
    .then(response => response.json())
    .then((responseData) =>{
      fetch(apiUrl + `/user/targets/assign`, {
          method: 'PUT',
          header:{
            'Content-Type' : 'application/json',
          // 'x-access-token' : this.props.token
      },
          body: JSON.stringify({
              result: responseData.result
          })
      })
    })
    .then(response => response.json())
    .then(result => this.props.assignTarget(result.target))
    .then((response) => {
        if (response.status === 200){
        this.props.navigation.navigate('Loading')
        }
     })

  }
  render(){
    const names = this.props.waitingPlayers.map(name => (<Text key={name}> {name + '\n'} </Text>))
    console.log("you son of a render", this.props.waitingPlayers)
    return (
      <View>
        <View>
        <Text>Room Code is: {this.props.roomCode}</Text>
        <Text>Total Player: {this.props.waitingPlayers.length}</Text>
        <Text>{names}</Text>
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
  assignTarget : (target) => {dispatch(newAssignTarget(target))},
  playersWaiting : (players, creator) => {dispatch(newPlayersWaiting(players, creator))}
})

const RoomConnector = connect(mapStateToProps, mapDispatchToProps)

export default RoomConnector(Room)
