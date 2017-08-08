import React, {Component} from 'react'
import {Button, View, Text} from 'react-native'
import {connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'
import {newAssignedTarget} from '../redux/actions'

export default class Loading extends Component {

  pressButton(){
    fetch('/user/startCountDown', {
     method: 'PUT',
     headers: {
       'Content-Type': 'application/json'
     },
        body: JSON.stringify({
          token: this.props.token,
          roomCode: this.roomCode
        })
    })
    .then((response) => {
      if (response.status === 200){
        this.props.navigation.navigate('Game')
      }
    })
 }

  fetchTarget(){
    fetch('/user/target/assign?room=${this.props.roomCode'}, { // WE CAN HAS NEW ROUTE? MAYBE?
      method: 'PUT',
      header:{
        'Content-Type' : 'application/json',
        'x-access-toke' : this.props.token
      }
    })
    .then(response => response.json())
    .then(result => this.props.assignTarget(result.target))
  }

  render(){
    return (
      <View>
      <Text>LOADING!!!!!</Text>
       <Text>Your mission, {this.props.username} is to KILL {this.props.target} 
       if you choose to accept it. You will also be vulnerable to your assassin
        when you press the Start Game Button. May the odds be ever in your favor.</Text>
          <Button onPress={this.pressButton.bind(this)} title={'Go to the game for realz'}/>
      </View>
     )
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  roomCode: state.roomCode,
  username: state.username,
  target: state.target
})

const mapDispatchToProps = (dispatch) => {
assignTarget : (target) => {dispatch(newAssignTarget(target))};

const LoadingConnector = connect(mapStateToProps)

export default LoadingConnector(Loading)

