import React, {Component} from 'react'
import {Button, View, TextInput} from 'react-native'
import {login} from '../redux/actions'
import {connect} from 'react-redux'

class Login extends Component {
  render(){

    return <View> 
    		<Button onPress={this.props.login} title="Login"/>
    	</View>
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login : () => {dispatch(login('test', 'test'))}
  }
}


const LoginConnector = connect(null, mapDispatchToProps)

export default LoginConnector(Login)
