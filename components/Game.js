
import React, {Component} from 'react'
import {Button, View, Text, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'
import Compass from './GameComponents/CompassComponents/Compass'
import KillButton from './GameComponents/KillButton'

export default class Game extends Component {
  constructor(props){
    super(props)
    this.state = {
      latitude: ' ',
      longitude: ' ',
      roomCode: ' ',
      username: ' ',
      targets: ' ',
      compass: ' '

    }

  }

Alert = () => {
  const showAlert = () => {
      Alert.alert(
         'WARNING!',
         'AN ASSASSIN IS NEARBY!!!!!!!'
      )
   }

   return (
      <TouchableOpacity onPress = {showAlert} style = {styles.button}>
        <Text>RUN!!!</Text>
      </TouchableOpacity>
   )
}

  })



  locationUpdate(){
    fetch('/user/location', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({latitude: this.latitude,
                           longitude: this.longitude})
    })
  }

  heartbeatMonitor(){
    let self = this
    fetch('/user/heartbeat', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({latitude: this.props.latitude,
                            longitude: this.props.longitude,
                            time: this.props.time,
                            username: this.props.username
                          })
    })

    then(() = {
      fetch(apiUrl + 'username/game/data/${self.props.username}', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': 'self.props.token'
        },
      })
      .then((response) => response.json())
      .then((responseData) => this.props.heartbeat)//??????
    }


    })
componentDidMount(){
  this.interval = setInterval(this.heartbeat.bing(this), 3000)
  console.log("the count is three, two, one...and repeat")
}

//here put function for the timer.
componentWillUnmount(){
  clearInterval(this.interval)
}
murderForHire() {
  fetch(apiURL + 'user/hireable', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': 'self.props.token'
    },
  })

}



kill(){
    fetch('/user/kill', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'x-access-token': this.props.token
     },
     body: JSON.stringify({latitude: this.props.latitude,
                           longitude: this.props.longitude})
    })
  }
  //when play logs in, begin the countdown to hireablity.  Time should be two minutes from LastUpdated.
//if the player is logged in, they are active.  CHeck their location, timeStamp, and alive status.

 // compass(){
 //   //fetch()to be determined
 // }

 listOfTheLiving() {
   fetch('/user/list/:roomCode', {
     method: 'GET',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({username: this.props.username})
   })
 }


//do we want the ghost room to be an automatic redirect?
  render(){
    return (
      <View>

        <Text>Be advised that Mother has laid out a set of rules in her last will and testament.  The rules must be
          followed and obeyed or you will be disqualified from the pool of potential heirs. Mother has gifted you with a
          locator to aid you in your quest.  I must also disclose that you have also been tagged with a locator and are
          being hunted. Do not attempt to locate or disarm your locator. Doing so will disqualify and eliminate you from
          the pool of heirs. Upon your login you will have a two minute wait time before you can eliminate your rival.
          You will be alerted when you are within a kill radius, and can be eliminated by a rival.  Be advised that this
          radius is smaller than the target radius, which you will also recieve when your target is near. This means, of
          course, that your hunter will see you before you see them. The final rule: If you do not stay active on your phone
          for at least 3 hours per day, you will be permanently and irrevocably eliminated from inheritance.
        Stay alert, stay safe, stay alive.</Text>
        <Button onPress={()=>this.props.navigation.navigate('GhostRoom')} title={'You Are Dead'}/>
          <Compass />
          <KillButton />
          </View>
          )


  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  latitude: state.latitude,
  longitude: state.longitude,
  username: state.username,
  target: state.target,
  kill: state.kill,
  heartbeat: state.heartbeat,
  time: state.time

})

mapDispatchToProps = (dispatch) => {

}

const GameConnector = connect(mapStateToProps, mapDispatchToProps)

export default GameConnector(Game)
