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
        'x-access-token' : this.props.token
      },
      body: JSON.stringify({username: this.props.username})
    })
  }

  RIP(){

    // fetch(apiUrl + `/bringOutYerDead/${this.props.roomCode}`, {
    //  method: 'GET',
    //  headers: {
    //    'Content-Type' : 'application/json',
    //    'x-access-token' : this.props.token
    //  }
    //
    // })
    // .then(response => response.json())
    // .then(result => this.props.deadPlayers(result.players))

    //console.log('GhostRoom is haunting', this.props.deadPlayers, (Date.now() - startTime) /1000);
   }

  render(){
  //  const names = this.props.deadPlayers.map(names => (<Text key={names}> {names + '\n'} </Text>))
    //console.log("happy haunting", this.props.deadPlayers)

        return (
        <View>
          <View>
            <Text>The Fallen: {names}</Text>
            <Text>"Through me you go into a city of weeping; through me you go into eternal pain; through me you go amongst the lost people"</Text>
            <Text>Abandon All Hope Ye Who Enter Here!</Text>
            <Button onPress={() => this.props.logout} title={'LogOut'}/>
          </View>
          <Text>Into the eternal darkness, into fire and ice...I regret to inform you that you have been eliminated.  If you
          wish, you may remain here and watch for the last heir.</Text>
        </View>
        )
    }
  }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 22
//   },
//   item: {
//     padding: 10,
//     fontSize: 15,
//     height: 44
//   }
//   Text: {
//     color: red,
//   }
// })

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
