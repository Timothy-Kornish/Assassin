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
    var self = this;
    fetch(apiUrl + `/user/list/${self.props.roomCode}`, {
     method: 'GET',
     headers: {
       'Content-Type' : 'application/json',
       'x-access-token' : self.props.token
     }
    })
    .then(response => response.json())
    .then(result => self.props.playersWaiting(result.players, result.creator))
    console.log('updatePlayers is firing with', self.props.playersWaiting, (Date.now() - startTime) /1000);
   }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

 pressButton(){
    var self = this;
    fetch(apiUrl + '/room/start', {
     method: 'PUT',
     headers: {
       'Content-Type': 'application/json',
       'x-access-token' : self.props.token
     },
        body: JSON.stringify({
          roomCode: self.props.roomCode
        })
     })
    .then(()=> {
      console.log("user/targets fired ")
      fetch(apiUrl + `/user/targets`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token' : self.props.token
        },
        body: JSON.stringify({
          roomCode: self.props.roomCode
        })
      })
    })
    .then(response => {
      console.log("response numero uno ", response)
      return response.json()
    })
    .then((responseData) =>{
      console.log("grab targets ", responseData)
      fetch(apiUrl + `/user/targets/assign`, {
          method: 'PUT',
          header:{
            'Content-Type' : 'application/json',
            'x-access-token' : self.props.token
      },
          body: JSON.stringify({
              result: responseData.result
          })
      })
    })
    .then(response => {
      return response.json()
    })
    .then(result => {
      console.log("result is ",result)
      self.props.assignTarget(result.target)
    })
    .then((response) => {
        if (response.status === 200){
        self.props.navigation.navigate('Loading')
        }
     })

  }
  render(){
    const names = this.props.waitingPlayers.map(name => (<Text key={name}> {name + '\n'} </Text>))
    console.log("you son of a render", this.props.waitingPlayers)
    return (
      <View>
        <View style={{backgroundColor: "black"}}>
        <Text style={{color: "white"}}>Room Code is: {this.props.roomCode}</Text>
        <Text style={{color: "white"}}>Total Player: {this.props.waitingPlayers.length}</Text>
        <Text style={{color: "white"}}>{names}</Text>
        <Button color="red" onPress={this.pressButton.bind(this)} title={'start game'}/>
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
