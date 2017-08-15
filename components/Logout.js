import React, {Component} from 'react';
import {AsyncStorage, Alert, Text, TextInput, TouchableOpacity, View, Button} from 'react-native';
import {login} from '../redux/actions'
import {connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'
import {apiUrl} from "../localConfig"

export default class Logout extends Component {
  async userLogout() {
    try {
      await AsyncStorage.removeItem('x-access-token');
      await AsyncStorage.removeItem('username');
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
