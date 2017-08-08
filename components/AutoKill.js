import React, {Component} from 'react'
import {Text} from 'react-native'
import KillConnector from './KillConnector'

class AutoKiller extends Component {
    render(){
      const {targetDistance, isAlive, kill}  = this.props
      if (targetDistance < 50 && isAlive){
        this.props.kill()
        return <Text>Target located!</Text>
      } else {
        return <Text>Kill your mark!</Text>
      }
    }
}

export default KillConnector(AutoKiller);
