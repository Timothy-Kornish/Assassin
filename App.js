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
import Logout from "./components/Logout"
import store from './redux/store'
import {locate} from './redux/actions'
import {StackNavigator} from 'react-navigation'


  const Header = (Component) => (props) => {
    return (

      <View style ={styles.container}>
        <Button color= 'darkred' title="Logout" onPress={()=>props.navigation.navigate('Logout')} />
        <Component {...props}/>
      </View>
    )
  }
  const Navigator = StackNavigator({
    Authentication: { screen: Header(Authentication) },
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
        <Navigator />
      </Provider>
    );
  }
}

var styles = StyleSheet.create({
  wrapper: { ...StyleSheet.absoluteFillObject, top: 0, bottom: 0,  backgroundColor: 'black', },
  container: {
    borderColor: 'silver',
    backgroundColor: 'black',

  },
  button: {
    margin: 10,
    color: 'white',
    backgroundColor: 'darkred',
  }
})