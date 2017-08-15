import React, {Component} from 'react'
import {Button, View, Text, FlatList, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'
import {newPlayersWaiting} from '../redux/actions'
import {newAssignedTarget} from '../redux/actions'
import {apiUrl} from '../localConfig'

class Room extends Component {

  componentWillMount(){
    this.startTime = Date.now()
    this.interval = setInterval(this.updatePlayers.bind(this), 3000)
    console.log("interval is firing every 3 seconds", (Date.now() - this.startTime) /1000)
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
    .then(result => {
      console.log(result)
      self.props.playersWaiting(result.players, result.creator)
    })
    console.log('updatePlayers is firing with', (Date.now() - self.startTime) /1000);
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
      .then(response => response.json())
      .then((responseData) =>{
            console.log("grab targets ", responseData)
            console.log("token before user/targets/assign ", self.props.token)
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
    const names = this.props.waitingPlayers.map(name => (<Text styles = {styles.words} key={name}> {name + '\n'} </Text>))
    console.log("you son of a render", this.props.waitingPlayers)
    return (
      <View>
        <View>
          <Text style = {styles.words}>Room Code is: {this.props.roomCode}</Text>
          <Text style = {styles.words}>Total Player: {this.props.waitingPlayers.length}</Text>
          <Text style = {styles.words}>{names}</Text>
          <Text style = {styles.words}>Room Creator: {this.props.roomCreator}</Text>
          <Button color = 'darkred' style = {styles.button}onPress={this.pressButton.bind(this)} title={'start game'}/>
          <View>
          {this.props.waitingPlayers.length > 1 ? 
            <Button onPress={this.pressButton.bind(this)} title={'start game'}/>
            : <Text> Waiting for more players to join </Text> }
          </View>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#C0C0C0',
    backgroundColor: '#000000',

  },
  button: {
    textAlign: 'center',
    margin: 10,
    color: '#C0C0C0',
    backgroundColor: '#8B0000',
  },
  words: {
    fontFamily: 'serif',
    fontWeight: 'bold',
    textAlign: 'center'
  }

})

const mapStateToProps = (state) => ({
  token : state.token,
  roomCode: state.roomCode,
  waitingPlayers: state.waitingPlayers,
  roomCreator: state.roomCreator,
  username: state.username
})

const mapDispatchToProps = (dispatch) => ({
  assignTarget : (target) => {dispatch(newAssignedTarget(target))},
  playersWaiting : (players, creator) => {dispatch(newPlayersWaiting(players, creator))}
})

const RoomConnector = connect(mapStateToProps, mapDispatchToProps)

export default RoomConnector(Room)