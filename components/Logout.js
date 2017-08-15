import React, {Component} from 'react';
import {AsyncStorage, Alert, Text, TextInput, TouchableOpacity, View, Button} from 'react-native';
import BackgroundTimer from 'react-native-background-timer'
import {login} from '../redux/actions'
import {connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'
import {apiUrl} from "../localConfig"

class Logout extends Component {
  async userLogout() {
    try {
      await AsyncStorage.removeItem('x-access-token');
      await AsyncStorage.removeItem('username');

      this.props.login(null, null)

      for (var i = 1; i < 1500; i++){
        BackgroundTimer.clearInterval(i)
        clearInterval(i)
        console.log("For loop number ", i)
      }

      Alert.alert('Logged Out')
      this.props.navigation.navigate('Authentication')
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  componentWillMount(){
    this.userLogout()
  }

  render(){
    return null;
  }
}

mapStateToProps = (state) => ({
  username: state.username,
  token: state.token
})

const mapDispatchToProps = (dispatch) => {
  return {
    login : (username, token) => {dispatch(login(username, token))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
