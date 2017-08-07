import React, {Component} from 'react'
import {Button, View, TextInput, AppRegistry, Text} from 'react-native'
import {login} from '../redux/actions'
import {connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'

class Login extends Component {
   //static navigationOptions = {title: 'Login',};

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
      method: 'PUT',
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
  //  const { navigate } = this.props.navigation;
  //onPress={()=>navigate('Lobby')

      return(
        <View>
          <Text>LAWG in page</Text>
    		  <Button onPress={()=>this.props.navigation.navigate('Lobby')} title="go to lobby boo ton"/>
        </View>
      )
    }
}


const mapDispatchToProps = (dispatch) => {
  return {
    login : () => {dispatch(login('test', 'test'))}
  }
}


const LoginConnector = connect(()=>({}), mapDispatchToProps)

export default LoginConnector(Login)
