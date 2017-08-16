import React, { Component } from 'react'
import { Button, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import killTarget from '../../redux/actions'
import {apiUrl} from '../../localConfig'



class KillButton extends Component {

  handleKill(){
    fetch(apiUrl + `/user/list/${this.props.roomCode}/${this.props.username}`,{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'x-access-token': this.props.token
      }
    })
    .then(response => response.json())
    .then(result => {
      fetch(apiUrl + '/user/kill', {
        method : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': this.props.token
        },
        body: JSON.stringify({
                              username: this.props.username,
                              list: result.playersInRoomArr
        })
      })
    })
  }

  render(){
    return <Button disabled={this.props.distance > 500 || this.props.hireable === 'true'} onPress={() => this.handleKill()} title='KILL TARGET'/>
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    target: state.target,
    targetsTarget: state.targetsTarget,
    isAlive : state.alive,
    distance: state.distance,
    roomCode: state.roomCode,
    token: state.token,
    hireable: state.hireable
  }
}

const mapDispatchToProps = (dispatch) => ({
    killTargetButton: (target, username, targetsTarget) => {dispatch(killTarget(target, username, targetsTarget))}
})

export default connect(mapStateToProps, mapDispatchToProps)(KillButton)
