import React, {Component} from 'react'
import {Button, View, TextInput} from 'react-native'
import {login} from '../redux/actions'
import {connect} from 'react-redux'

class Login extends Component {

  login(){
    fetch('/login', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({username: this.username,
                        password: this.password})
    })
  }

  createNewUser(){
    fetch('/userNew', {
      method: 'PUT'
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({username: this.username,
                            password: this.password})
    })
  }

  startCooldown(){
    fetch('/user/startCountDown', {
      method: 'PUT',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({username: this.username})
    })
  }


  render(){

    return(
      <View>
    		<Button onPress={this.props.login} title="Login"/>
    	</View>
    )  
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login : () => {dispatch(login('test', 'test'))}
  }
}


const LoginConnector = connect(null, mapDispatchToProps)

export default LoginConnector(Login)
