import React, {Component} from 'react'
import {Button, View} from 'react-native'
import {login} from '../redux/actions'
import {connect} from 'react-redux'

class Login extends Component {
  render(){

    return <Button onPress={this.props.login} title="Login"/>
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    login : () => {
      dispatch(login('test', 'test'))
    }
  }
}

const LoginConnector = connect(null, mapDispatchToProps)

export default LoginConnector(Login)
