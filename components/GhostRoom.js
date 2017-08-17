import React, {Component} from 'react'
import {Button, View, Text, StyleSheet, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'
import {apiUrl} from '../localConfig'
import Assassin3 from './assets/components/Assassin3'
import {newGhostRoom} from '../redux/actions'

class GhostRoom extends Component {

  bringOutYerDead(){
    // let players, playerDataList, deadPlayers = []
    let self = this
    fetch(apiUrl + `/bringOutYerDead`, {
      method: 'POST',
      headers: {
       'Content-Type' : 'application/json',
       'x-access-token' : this.props.token
      },
      body: JSON.stringify({
       username: self.props.username,
       roomCode: self.props.roomCode
      })
    })
    .then(response => response.json())
    .then(result => {
      this.props.ghostRoom(result.deadPeopleArr)
    })
  }

  componentDidMount(){
    this.interval = setInterval(this.bringOutYerDead.bind(this), 3000)
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  render(){
    console.log("deadPlayers ", this.props.deadPlayers)
    const names = this.props.deadPlayers.map(names => (<Text style = {styles.words} key={names.username}> {'\n' + names.username } </Text>))
        return(
          <ScrollView>
         <View>
           <View style = {styles.container}>
             <Text style = {styles.words}>The Fallen: {names}</Text>
             <Text>{'\n'} </Text>
             <Text style = {styles.words}>Through me you go into a city of weeping; through me you go into eternal pain; through me you go amongst the lost people</Text>
             <Text style = {styles.words}>Abandon All Hope Ye Who Enter Here!</Text>
             <Text>{'\n'} </Text>
           </View>
           <Text style = {styles.words}>Into the eternal darkness, into fire and ice...I regret to inform you that you have been eliminated.  If you
           wish, you may remain here and watch for the last heir.</Text>
           <Assassin3
             source={require('./assets/GhostRoom.png')}
             originalWidth={485}
             originalHeight={562}/>
         </View>
       </ScrollView>
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
 username: state.username,
 deadPlayers: state.deadPlayers
})

const mapDispatchToProps = (dispatch) => ({
 ghostRoom : (deadPeopleArr) => {dispatch(newGhostRoom(deadPeopleArr))}
})

const RoomConnector = connect(mapStateToProps, mapDispatchToProps)

export default RoomConnector(GhostRoom)
