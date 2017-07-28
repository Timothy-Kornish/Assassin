import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import Geolocation from "./geolocation"
import Login from "./login/login"
import { Provider } from 'react-redux'
import store from './redux/store'


export default class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <View style={styles.container}>
          <Geolocation/>
          <Login />
          <Text>Hello world!</Text>
        </View>
      <Provider/>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => HelloWorldApp);
