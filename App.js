import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
//import Geolocation from "./geolocation"
import Login from "./components/Login"
import Logout from "./components/Logout"
import LocationWatcher from "./components/LocationWatcher"
import { Provider } from 'react-redux'
import store from './redux/store'


export default class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <View>
          <Text>This is hidden in the tool bar</Text>
          <Text>Hello. My name is Inigo Montoya. You killed my father. Prepare to die.</Text>
          <Login/>
          <Logout/>
          <View>
            <Text> Here is your location, the assassins are coming for you. </Text>
            <LocationWatcher/>
          </View>
        </View>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => HelloWorldApp);
