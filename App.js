import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, View,Button } from 'react-native';
import { Provider } from 'react-redux'
import BackgroundTimer from 'react-native-background-timer';
import Authentication from "./components/Authentication"
import Lobby from "./components/Lobby"
import Room from "./components/Room"
import Loading from "./components/Loading"
import Game from "./components/Game"
import GhostRoom from "./components/GhostRoom"
import LocationWatcher from "./components/LocationWatcher"
import Logout from "./components/Logout"
import store from './redux/store'
import {locate} from './redux/actions'
import {StackNavigator} from 'react-navigation'


  const Header = (Component) => (props) => {
    return (
      <View>
        <Button title="Logout" onPress={()=>props.navigation.navigate('Logout')} />
        <Component {...props}/>
      </View>
    )
  }
  const Navigator = StackNavigator({
    Authentication: {screen: Authentication},
    Lobby: { screen: Header(Lobby) },
    Room: { screen: Header(Room) },
    Loading: { screen: Header(Loading) },
    Game: { screen: Header(Game) },
    GhostRoom: {screen: Header(GhostRoom)},
    Logout: {screen: Logout}
  });

  AppRegistry.registerComponent('Navigator', () => Navigator);

export default class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <Provider store = {store}>
         <Navigator/>
      </Provider>
    );
  }
}
