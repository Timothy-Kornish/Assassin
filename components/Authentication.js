import React, {Component} from 'react';
import {AsyncStorage, Alert, Text, TextInput, TouchableHighlight, View, Button, StyleSheet, Image} from 'react-native';
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
      return (<View><Text style = {styles.words}>Loading</Text></View>)
    } else {
      return (
        <View style = {styles.container}>


          <Text style = {styles.words}> Welcome </Text>

          <View>

            <TextInput
              style = {{padding: 15, backgroundColor: "white"}}
              editable={true}
              onChangeText={(username) => this.setState({username})}
              placeholder='Username'
              ref='username'
              returnKeyType='next'
              value={this.state.username}
            />

            <TextInput
              style = {{padding: 15, backgroundColor: "white"}}
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



            <Button color="darkred" fontFamily = 'serif' onPress={() => this.props.navigation.navigate('Lobby')} title='Go To Lobby'/>
            <Button color="darkred" fontFamily = 'serif'  onPress={() => this.props.navigation.navigate('Room')} title='Go To Room'/>
            <Button color="darkred" fontFamily = 'serif' onPress={() => this.props.navigation.navigate('Loading')} title='Go To Loading'/>
            <Button color="darkred" fontFamily = 'serif' onPress={() => this.props.navigation.navigate('Game')} title='Go To Game'/>
            <Button color="darkred" fontFamily = 'serif' onPress={() => this.props.navigation.navigate('GhostRoom')} title='Youre Dead to me'/>

          </View>
          <Image style ={{height: 25, width: 25}} source = {require('./calvinsarts/Logo.png')}/>
          <Image style ={{height: 25, width: 25}} source = {require('./calvinsarts/femalecovermodel.png')}/>
          <Image style ={{height: 25, width: 25}} source = {require('./calvinsarts/malecovermodel.png')}/>
        </View>
      );
    }
  }
}

var styles = StyleSheet.create({

  button: {
<<<<<<< HEAD

=======
>>>>>>> ea0b3eb6900e0f246bb2bdd08fda787ae1d5b262
    backgroundColor: 'darkred',

  },
  words: {

    color: 'white',
  }

})




const mapDispatchToProps = (dispatch) => {
  return {
    login : (username, token) => {dispatch(login(username, token))}
  }
}

export default connect(()=>({}), mapDispatchToProps)(Authentication)
