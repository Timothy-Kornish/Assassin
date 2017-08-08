import React, { Component } from 'react';
import { Button } from 'react-native'
import  KillConnector from './KillConnector';

class KillButton extends Component {

  takeThemOut(){
    fetch('/user/kill'{
      METHOD : 'POST'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: this.username,
                            target: this.props.target,
                            targetsTarget: this.props.targetsTarget,
                            targetStatus: this.props.isAlive
                          })
     })
    })
    this.props.kill()
  }


  render(){
    const canKill = this.props.targetDistance < 50 && this.props.isAlive
    return <Button disabled={!canKill} onClick={() => this.handleKill()}>Kill</Button>
  }
}



export Default KillConnector(KillButton)
