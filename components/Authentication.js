import React, {Component} from 'react';
import {AsyncStorage, Alert, Text, TextInput, TouchableOpacity, View, Button} from 'react-native';
import {login} from '../redux/actions'
import {connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'
import {apiUrl} from "../localConfig"

class Authentication extends Component {

  constructor() {
    super();
    this.state = { username: null, password: null, isLoaded: false };
  }

  async saveItem(item, selectedValue) {
    console.log("item and selectedValue ", item, selectedValue)
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }

  async userLogout() {
    try {
      await AsyncStorage.removeItem('x-access-token');
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  async getItem(item) {
    console.log("getting item ", item)
    try {
      var value = await AsyncStorage.getItem(item);
      console.log("pulled value is ", value)
      return value;
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }

  userSignup() {
    if (!this.state.username || !this.state.password) return;
      // localhost doesn't work because the app is running inside an emulator. Get the IP address with ifconfig.
      fetch(apiUrl + '/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        })
      })
    .then((response) => response.json())
    .then((responseData) => {
      console.log("responseData ", responseData)
      this.saveItem('x-access-token', responseData.token),
      this.saveItem('username', this.state.username),
      Alert.alert( 'Signup Success!', responseData.token),
      this.goToLobby(responseData.token, this.state.username);
    })
    .done();
  }

  userLogin() {
    if (!this.state.username || !this.state.password) return;
    // localhost doesn't work because the app is running inside an emulator. Get the IP address with ifconfig.
      fetch(apiUrl + '/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        })
      })
      .then((response) => response.json())
      .then((responseData) => {
        if(responseData.success){
          this.saveItem('x-access-token', responseData.token),
          this.saveItem('username', this.state.username),
          Alert.alert('Login Success!', responseData.token),
          this.goToLobby(responseData.token, this.state.username);
        }else{
          Alert.alert('Login Failed', 'Incorrect username or password')
        }
      })
      .done();
  }


  goToLobby(token, username){
    this.props.login(username, token)
    this.props.navigation.navigate('Lobby')
  }

  async componentWillMount(){

    const self = this;
    console.log("componentWillMount fired")
    var username  = await self.getItem("username")
    var token = await self.getItem("x-access-token")


    console.log("Token and username ", token, username)

    fetch(apiUrl + '/auto/authenticate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        token: token
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log("responseData ", responseData)
      if(responseData.success){
        self.goToLobby(token, username);
      } else if(!responseData.success){
        self.setState({isLoaded: true})
        return null;
      }
    })
  }

  render() {
    if(!this.state.isLoaded){
      return (<View><Text>Loading</Text></View>)
    } else {
      return (
        <View>
          <Text> Welcome </Text>

          <View>
            <TextInput
              editable={true}
              onChangeText={(username) => this.setState({username})}
              placeholder='Username'
              ref='username'
              returnKeyType='next'
              value={this.state.username}
            />

            <TextInput
              editable={true}
              onChangeText={(password) => this.setState({password})}
              placeholder='Password'
              ref='password'
              returnKeyType='next'
              secureTextEntry={true}
              value={this.state.password}
            />

            <TouchableOpacity onPress={this.userLogin.bind(this)}>
              <Text> Log In </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.userSignup.bind(this)}>
              <Text> Sign Up </Text>
            </TouchableOpacity>

            <Button onPress={() => this.props.navigation.navigate('Lobby')} title='Go To Lobby'/>
            <Button onPress={() => this.props.navigation.navigate('Room')} title='Go To Room'/>
            <Button onPress={() => this.props.navigation.navigate('Loading')} title='Go To Loading'/>
            <Button onPress={() => this.props.navigation.navigate('Game')} title='Go To Game'/>
            <Button onPress={() => this.props.navigation.navigate('GhostRoom')} title='Youre Dead to me'/>

          </View>
        </View>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login : (username, token) => {dispatch(login(username, token))}
  }
}

export default connect(()=>({}), mapDispatchToProps)(Authentication)
