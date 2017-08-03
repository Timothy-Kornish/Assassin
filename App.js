import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, View,Button } from 'react-native';
import { Provider } from 'react-redux'
import BackgroundTimer from 'react-native-background-timer';
import Login from "./components/Login"
import Logout from "./components/Logout"
import LocationWatcher from "./components/LocationWatcher"
import store from './redux/store'
import {locate} from './redux/actions'
import {StackNavigator} from 'react-navigation'


  const rc = (text, link)=> (props) => {
                        console.log('perps', props)
                        return (<View>
                              <Text>{text}</Text>
                              <Button onPress={()=>props.navigation.navigate(link)} title={'Go to ' + link}/>
                           </View>)
                      }


  const Header = (Component) => (props) => {
    return (<View>
        <Button title="Logout" onPress={()=>'BON JOVI'} />
        <Component {...props}/>
      </View>)


  }
  const Navigator = StackNavigator({
    Login: { screen: rc('Login', 'Lobby')},
    Lobby: { screen: Header(rc('Lobby', 'Room')) },
    Room: { screen: Header(rc('Room', 'Loading')) },
    Loading: { screen: Header(rc('Loading', 'Game')) },
    Game: { screen: Header(rc('Game', 'GhostRoom')) },
    GhostRoom: {screen: Header(rc('GhostRoom', 'Lobby'))},
    Logout: {screen: rc('Logout', 'Login')}
  });

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
   // this.logout = this.logout.bind(this)
  }



  render() {
    return (
      <Provider store = {store}>
          <Navigator/>
      </Provider>
    );
  }
}
