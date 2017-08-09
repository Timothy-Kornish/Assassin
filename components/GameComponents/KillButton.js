import React, { Component } from 'react'
import { Button, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import KillTarget from '../../redux/actions'


class KillButton extends Component {

  handleKill(){

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
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: this.username,
                              list: result
        })
      })
    })

    this.props.kill()
  }

  render(){
    return <Button disabled={!this.props.killable} onPress={() => this.handleKill()} title='KILL TARGET'/>
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    target: state.target,
    targetsTarget: state.targetsTarget,
    isAlive : true,
    targetDistance: 20,//state.target.distance
    killable: true,//state.killable,
    roomCode: state.roomCode,
    token: state.token

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    killTargetButton: (target, username, targetsTarget) => {dispatch(killTarget(target, username, targetsTarget))}
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KillButton)
