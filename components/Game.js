import React, {Component} from 'react'
import {Button, View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native'
import {connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'
import Compass from './GameComponents/CompassComponents/Compass'
import KillButton from './GameComponents/KillButton'
import Timer from './GameComponents/Timer'
import BackgroundTimer from 'react-native-background-timer'
import {apiUrl} from '../localConfig'
import {newHeartBeat} from '../redux/actions'
import {sendPN} from './GameComponents/PushNotifications'



class Game extends Component {
  constructor(props){
    super(props)
    this.heartbeatTimer = BackgroundTimer.setInterval (this.heartBeat.bind(this), 1500);

  }

  heartBeat(){
    let self = this
    fetch(apiUrl + '/user/heartbeat', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token' : self.props.token
      },
      body: JSON.stringify({username: self.props.username,
                            latitude: self.props.latitude,
                            longitude: self.props.longitude
                          })
    })
    .then(response => response.json())
    .then(result => console.log("RESULT ", result))
    .then(()=>{
      fetch(apiUrl + `/user/game/data/${self.props.username}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token' : self.props.token
        }
      })
      .then(response => response.json())
      .then(result => {
        let {hireable, alive} = result.listObj[self.props.username]
        let target = result.target
        let arr = Object.values(result.listObj)
        let count = 0
        console.log("array of peeps", arr)
        self.props.heartbeat(alive, result.theta, result.distance, result.target, result.targetsTarget, result.listObj, hireable)
        arr.forEach(obj => {

          if(obj.username == obj.target && obj.alive == 'true'){
            count++
          }
        })

        if((count == 1 && this.props.username == result.target) && alive == "true"){

          BackgroundTimer.clearInterval(this.heartbeatTimer)
          console.log("interval cleared", this.heartbeatTimer)
          Alert.alert('Victory', `You El ${this.props.username} have defeated all the heirs.`)
        }
        if(alive === 'dead') {
          BackgroundTimer.clearInterval(this.heartbeatTimer)
          console.log("interval cleared", this.heartbeatTimer)
          self.props.navigation.navigate('GhostRoom')
        }
      })
    })
  }

  render(){
    return (
      <View style = {styles.container}>
        <Button title='Rules' onPress={()=> Alert.alert('Rules',
          `Be advised that Mother has laid out a set of rules in her last will and testament.  The rules must be
          followed and obeyed or you will be disqualified from the pool of potential heirs. Mother has gifted you with a
          locator to aid you in your quest.  I must also disclose that you have also been tagged with a locator and are
          being hunted. Do not attempt to locate or disarm your locator. Doing so will disqualify and eliminate you from
          the pool of heirs. Upon your login you will have a two minute wait time before you can eliminate your rival.
          You will be alerted when you are within a kill radius, and can be eliminated by a rival.  Be advised that this
          radius is smaller than the target radius, which you will also recieve when your target is near. This means, of
          course, that your hunter will see you before you see them. The final rule: If you do not stay active on your phone
          for at least 3 hours per day, you will be permanently and irrevocably eliminated from inheritance.
        Stay alert, stay safe, stay alive.`)}></Button>
        <Button color = 'darkred' style = {styles.button} onPress={()=>this.props.navigation.navigate('GhostRoom')} title={'You Are Dead'}/>
        <Timer/>
        <Compass />
        <KillButton />
        <TouchableOpacity onPress={sendPN}>
          <Text style={styles.words}>Push-Note</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  button: {
    backgroundColor: 'darkred',
  },
  words: {
    color: 'white',
  }
})

const mapStateToProps = (state) => ({
  token : state.token,
  roomCode: state.roomCode,
  username: state.username,
  latitude: state.latitude,
  longitude: state.longitude,
  target: state.target,
  targetsTarget: state.targetsTarget,
  distance: state.distance,
  theta: state.theta
})

const mapDispatchToProps = (dispatch) => ({
  heartbeat: (alive, theta, distance, target, targetsTarget, listObj, hireable)=>{dispatch(newHeartBeat(alive, theta, distance, target, targetsTarget, listObj, hireable))}
})

const GameConnector = connect(mapStateToProps, mapDispatchToProps)

export default GameConnector(Game)
