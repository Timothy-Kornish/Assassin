import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
//import Geolocation from "./geolocation"
import Login from "./components/Login"
import Logout from "./components/Logout"
import { Provider } from 'react-redux'
import store from './redux/store'
import GeoConnect from "./redux/GeoConnect"




export default class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <View>
          <Login />
          <Logout />
          <Text>May the Force be with you, and may the odds be ever in your favor!</Text>
          <GeoConnect />
          <Text>It's kill, or be killed.  The choice is yours!</Text>
        </View>
      </Provider>
    );
  }
}


AppRegistry.registerComponent('AwesomeProject', () => HelloWorldApp);
