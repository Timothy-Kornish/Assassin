import React, {Component} from 'react'
import {Button, View, Text, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'
import {apiUrl} from '../localConfig'


class GhostRoom extends Component {
  logout(){
    fetch(apiUrl + '/logout', {
      method: 'PUT',
      headers: {
        "Content-Type": 'application/json',
        'x-access-token': this.props.token

      },
      body: JSON.stringify({username: this.props.username})
    })
  }


  bringOutYerDead(){
    let players, playerDataList, deadPlayers = []
    let self = this
    fetch(apiUrl + `/bringOutYerDead`, {
     method: 'PUT',
     headers: {
       'Content-Type' : 'application/json',
       'x-access-token' : this.props.token
     },
     body: JSON.stringify({
       username: this.props.username
     })

    })
    .then(()=> {
      fetch(apiUrl + `/user/game/data/${self.props.username}`, {
        method: 'GET',
        headers: {
          "Content-Type": 'application/json',
          'x-access-token': self.props.token
        },
      })
    })
    .then(response => response.json())
    .then(result => {
      playerDataList = result.listObj
    })
    fetch(apiUrl + `/RIP/${this.props.roomCode}`, {
      method: 'Get',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': self.props.token
      }
    })
    .then(response => response.json())
    .then(result =>{
      players = result.result
      players.forEach(val=> val = val.username)
      players.forEach(username => {
        if(playerDataList[username].alive == 'false'){
          deadPlayers.concat([username])
        }
      })
      this.props.deadPlayers(deadPlayers)
    })
     console.log('GhostRoom is haunting', this.props.deadPlayers, (Date.now() - startTime) /1000);
   }

  componentDidMount(){
    this.interval = setInterval(this.bringOutYerDead.bind(this), 3000)
    console.log("the bell tolls every 3 seconds")
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  render(){
    const names = "eggplant"// this.props.deadPlayers.map(names => (<Text styles = {styles.words} key={names}> {names + '\n'} </Text>))
    console.log("happy haunting", this.props.deadPlayers)

        return(
        <View>
          <View style = {styles.container}>

            <Text style = {styles.words}>The Fallen: {names}</Text>
            <Text style = {styles.words}>Through me you go into a city of weeping; through me you go into eternal pain; through me you go amongst the lost people</Text>
            <Text style = {styles.words}>Abandon All Hope Ye Who Enter Here!</Text>
            <Button color = 'darkred' style = {styles.button} onPress={() => this.props.logout} title={'LogOut'}/>
          </View>
          <Text style = {styles.words}>Into the eternal darkness, into fire and ice...I regret to inform you that you have been eliminated.  If you
          wish, you may remain here and watch for the last heir.</Text>
        </View>
          )

    }
  }
  var styles = StyleSheet.create({
    container: {

      backgroundColor: 'black',

    },
    button: {
      margin: 20,
      color: 'silver',
      backgroundColor: 'darkred',
    },
    words: {
      fontWeight: 'bold',
      color: 'white',
    }
  })

const mapStateToProps = (state) => ({
 token : state.token,
 roomCode: state.roomCode,
 username: state.username
})

const mapDispatchToProps = (dispatch) => ({
 ghostRoom : (deadPlayers) => {dispatch(newGhostRoom(deadPlayers))}
})

const RoomConnector = connect(mapStateToProps, mapDispatchToProps)

export default RoomConnector(GhostRoom)
