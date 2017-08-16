import React, {Component} from 'react';
import { ScrollView, AppRegistry, StyleSheet, Text, View,Button } from 'react-native';
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

      <View style ={styles.container}>
        <Button title="Logout" onPress={()=>props.navigation.navigate('Logout')} />
        <Component {...props}/>
      </View>
    )
  }

  // FirstPage: {
  //   screen: FirstPage,
  //   navigationOptions: {
  //     title: "FirstPage",
  //     header: {
  //       left: null,
  //     }
  //   },
  // }
  const Navigator = StackNavigator({
    Authentication: { screen: Header(Authentication), navigationOptions: {
      headerLeft: null} 
    },
    Lobby: { screen: Header(Lobby), navigationOptions: {
      headerLeft: null}
    },
    Room: { screen: Header(Room), navigationOptions: {
      headerLeft: null} 
    },
    Loading: { screen: Header(Loading), navigationOptions: {
      headerLeft: null} 
    },
    Game: { screen: Header(Game), navigationOptions: {
      headerLeft: null} 
    },
    GhostRoom: {screen: Header(GhostRoom), navigationOptions: {
      headerLeft: null}
    },
    Logout: {screen: Logout}
  });

  AppRegistry.registerComponent('Navigator', () => Navigator);

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
      <ScrollView>
        <Provider store = {store}>
          <Navigator />
        </Provider>
      </ScrollView>
        );
        }
}

var styles = StyleSheet.create({
  wrapper: { ...StyleSheet.absoluteFillObject, top: 0, bottom: 0,  backgroundColor: 'black', },
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: 'silver',
    backgroundColor: 'black',

  },
  button: {
    margin: 10,
    color: 'white',
    backgroundColor: 'darkred',
  }
})
