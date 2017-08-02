import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, View,Button } from 'react-native';
import { Provider } from 'react-redux'
import BackgroundTimer from 'react-native-background-timer';
import Login from "./components/Login"
import Logout from "./components/Logout"
import LocationWatcher from "./components/LocationWatcher"
import store from './redux/store'
import {locate} from './redux/actions'



export default class App extends Component {
  constructor(props){
    super(props);
    const geolocatorTimer = BackgroundTimer.setInterval (() => {
      navigator.geolocation.getCurrentPosition(
        (position) => store.dispatch(locate(position.coords.latitude, position.coords.longitude, null)),
        (error) => store.dispatch(locate(null,null, error.message)),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      )
    }, 3000);
  }

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
