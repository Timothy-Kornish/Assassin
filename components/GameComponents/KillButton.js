import React, { Component } from 'react'
import { Button, StyleSheet, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import KillTarget from '../../redux/actions'


class KillButton extends Component {

  handleKill(){

//this first route needs to be changed
    fetch(`/user/list/${this.props.roomCode}`,{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'x-access-token': this.props.token
      }
    })
    .then(response => response.json())
    .then(result => {
      fetch('/user/kill', {
        method : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': this.props.token
        },
        body: JSON.stringify({username: this.props.username,
                              list: result.targets
        })
      })
    })

    this.props.killTargetButton(this.props.target, this.props.username, this.props.targetsTarget)
  }

  render(){
    return <Button color="red" disabled={!this.props.killable} onPress={() => this.handleKill()} title='KILL TARGET'/>
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    target: state.target,
    targetsTarget: state.targetsTarget,
    isAlive : state.alive,
    targetDistance: state.distance,
    killable: state.killable,
    roomCode: state.roomCode,
    token: state.token

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    killTargetButton: (target, username, targetsTarget) => {dispatch(killTarget(target, username, targetsTarget))}
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(KillButton)
