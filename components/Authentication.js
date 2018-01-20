import React, {Component} from 'react';
import {AsyncStorage, Alert, Text, TextInput, TouchableHighlight, View, Button, StyleSheet, ScrollView} from 'react-native';
import {login} from '../redux/actions'
import {locate} from '../redux/actions'
import {joinroom} from '../redux/actions'
import {connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'
import {apiUrl} from "../localConfig"
import BackgroundTimer from 'react-native-background-timer'
import Logo from './assets/components/Logo'
import Assassin1 from './assets/components/Assassin1'
import Assassin2 from './assets/components/Assassin2'
import credits from './assets/credits'


class Authentication extends Component {

  constructor() {
    super()
    this.state = {
      username: null,
      password: null,
      isLoaded: false
    }
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
      Alert.alert( 'Signup Success!', responseData.token)
      this.goToLobby(responseData.token, this.state.username);
    })
    .done();
  }

  userLogin() {
    if (!this.state.username || !this.state.password) return;
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
          this.saveItem('x-access-token', responseData.token)
          this.saveItem('username', this.state.username)
          Alert.alert('Login Success!', responseData.token)
          this.loginRedirect(this.state.username, responseData.token)
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

  goToGame(token, username, roomCode){
    this.props.login(username, token)
    this.props.joinroom(username, roomCode)
    this.props.navigation.navigate('Game')
  }

  goToRoom(token, username, roomCode) {
    this.props.login(username, token)
    this.props.joinroom(username, roomCode)
    this.props.navigation.navigate('Room')
  }
  goToGhost(token, username, roomCode){
    this.props.login(username, token)
    this.props.joinroom(username, roomCode)
    this.props.navigation.navigate('GhostRoom')
  }

  async componentWillMount(){
    const geolocatorTimer = BackgroundTimer.setInterval (() => {
      console.log("Authentication js timer firing ")
      navigator.geolocation.getCurrentPosition(
        (position) => this.props.locate(position.coords.latitude, position.coords.longitude, null),
        (error) => this.props.locate(null,null, error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      )
    }, 3000);

    const self = this;
    console.log("componentWillMount fired")
    var username  = await self.getItem("username")
    var token = await self.getItem("x-access-token")
    if (!username || !token){
      this.setState({isLoaded: true})
    } else {
      console.log("Token and username ", token, username)
      this.loginRedirect(username, token)
  }
}

  loginRedirect(username, token){
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
        if(responseData.success && !responseData.roomCode){
          console.log('GETTIN TO the autolobby ', token, username)
          this.goToLobby(token, username);
        } else if (responseData.success && responseData.alive === 'true') {
          this.goToGame(token, username, responseData.roomCode)
        } else if (responseData.success && responseData.alive === 'false') {
          this.goToRoom(token, username, responseData.roomCode)
        } else if (responseData.success && responseData.alive === 'dead') {
          this.goToGhost(token, username, responseData.roomCode)
        } else if(!responseData.success){
          this.setState({isLoaded: true})
          return null;
        }
      })
    }

  render() {
    if(!this.state.isLoaded){
      return (<View><Text style = {styles.words}>Loading</Text></View>)
    } else {
      return (
        <ScrollView>
        <View style={styles.container}>
          <Logo
          source={require('./assets/Logo.png')}
          originalWidth={954}
          originalHeight={492}/>
          <TouchableHighlight onPress={() => Alert.alert('Credits', credits)}>
            <Text style={styles.words}>Credits</Text>
          </TouchableHighlight>
          <View>
            <TextInput
              style = {{padding: 10, backgroundColor: "white"}}
              editable={true}
              onChangeText={(username) => this.setState({username})}
              placeholder='Username'
              ref='username'
              returnKeyType='next'
              value={this.state.username}
            />
            <TextInput
              style = {{padding: 10, backgroundColor: "white"}}
              editable={true}
              onChangeText={(password) => this.setState({password})}
              placeholder='Password'
              ref='password'
              returnKeyType='next'
              secureTextEntry={true}
              value={this.state.password}
            />
            <TouchableHighlight style={styles.button} onPress={this.userLogin.bind(this)}>
              <Text style ={styles.words}> Log In </Text>
            </TouchableHighlight>
            <TouchableHighlight style = {styles.button} onPress={this.userSignup.bind(this)}>
              <Text style ={styles.words}> Sign Up </Text>
            </TouchableHighlight>
            <View flexDirection='row' style={{alignItems: 'baseline', margin:20}}>
              <Assassin1
              source={require('./assets/Cover1.png')}
              originalWidth={470}
              originalHeight={293}/>
              <Assassin2
              source={require('./assets/Cover2.png')}
              originalWidth={262}
              originalHeight={533}/>
            </View>
          </View>
        </View>
        </ScrollView>
      );
    }
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  button: {
    backgroundColor: 'darkred',
    marginTop: 10,
    marginBottom: 10,
    padding: 5
  },
  words: {
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
    marginBottom: 10,
    padding: 5
  }
})

const mapDispatchToProps = (dispatch) => {
  return {
    joinroom: (username, roomCode) => {dispatch(joinroom(roomCode, username))},
    login : (username, token) => {dispatch(login(username, token))},
    locate : (latitude, longitude, error) => {dispatch(locate(latitude, longitude, error))}
  }
}

export default connect(()=>({}), mapDispatchToProps)(Authentication)
