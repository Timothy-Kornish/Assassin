import React, { Component } from 'react';
import { Button } from 'react-native'
import  KillConnector from './KillConnector';

class KillButton extends Component {

  handleKill(){
    this.props.kill()
  }

  render(){
    const canKill = this.props.targetDistance < 50 && this.props.isAlive
    return <Button disabled={!canKill} onClick={() => this.handleKill()}>Kill</Button>
  }
}



export Default KillConnector(KillButton)
