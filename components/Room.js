import React, {Component} from 'react'
import {Button, View, Text, FlatList, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'
import {newPlayersWaiting, newLoadPlayers, newAssignedTarget} from '../redux/actions'
import {apiUrl} from '../localConfig'

class Room extends Component {

  componentWillMount(){
    this.startTime = Date.now()
    this.interval = setInterval(this.updatePlayers.bind(this), 3000)
    }

  updatePlayers(){
    var self = this;
    fetch(apiUrl + `/user/list/${self.props.roomCode}/${self.props.username}`, {
     method: 'GET',
     headers: {
       'Content-Type' : 'application/json',
       'x-access-token' : self.props.token
     }
    })
    .then(response => response.json())
    .then(result => {
      self.props.playersWaiting(result.players, result.creator)
      fetch(apiUrl + `/room/redirect/${this.props.roomCode}`, {
        method: 'GET',
        headers: {
          'Content-Type' : 'application/json',
          'x-access-token' : self.props.token
        }
      })
      .then(response => response.json())
      .then(result => {
        console.log("game active: ",result.active, result)
        self.props.loadPlayers(result.active)
        console.log("this.props.active", this.props.active)
        if(this.props.active == 1){
          console.log("active fired")
          clearInterval(this.interval)
          self.props.navigation.navigate('Loading')

        }
      })
    })
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
      .then(response => response.json())
      .then((responseData) =>{
            fetch(apiUrl + `/user/targets/assign`, {
                method: 'PUT',
                headers:{
                  'Content-Type' : 'application/json',
                  'x-access-token' : self.props.token
                },
                body: JSON.stringify({
                    result: responseData.result
                })
            })
            .then(() => {
              fetch(apiUrl + `/user/game/data/${self.props.username}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'x-access-token': self.props.token
                }
              })
              .then((response) => response.json())
              .then((responseData) => self.props.assignTarget(responseData.target))
              .then(() => {
                clearInterval(this.interval)
              self.props.navigation.navigate('Loading')
              })
            })
      })
    })
  }

  render(){
    const names = this.props.waitingPlayers.map(name => (<Text style = {styles.words} key={name}> {name + '\n'} </Text>))
    console.log("you son of a render", this.props.waitingPlayers)
    return (
      <View>
        <View>
          <Text style = {styles.words}>Room Code is: {this.props.roomCode}</Text>
          <Text style = {styles.words}>Total Player: {this.props.waitingPlayers.length}</Text>
          <Text style = {styles.words}>{names}</Text>
          <Text style = {styles.words}>Room Creator: {this.props.roomCreator}</Text>
          <View>
          {this.props.waitingPlayers.length > 1 ?
            <Button disabled = {this.props.username !== this.props.roomCreator} color = 'darkred' style = {styles.button}onPress={this.pressButton.bind(this)} title={'start game'}/>
            : <Text style = {styles.words}> Waiting for more players to join </Text> }
          </View>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
  },
  button: {
    backgroundColor: '#8B0000',
  },
  words: {
    color: 'white',
  }
})

const mapStateToProps = (state) => ({
  token : state.token,
  roomCode: state.roomCode,
  waitingPlayers: state.waitingPlayers,
  roomCreator: state.roomCreator,
  username: state.username,
  active: state.active
})

const mapDispatchToProps = (dispatch) => ({
  assignTarget : (target) => {dispatch(newAssignedTarget(target))},
  playersWaiting : (players, creator) => {dispatch(newPlayersWaiting(players, creator))},
  loadPlayers : (active) => {dispatch(newLoadPlayers(active))}
})

const RoomConnector = connect(mapStateToProps, mapDispatchToProps)

export default RoomConnector(Room)
