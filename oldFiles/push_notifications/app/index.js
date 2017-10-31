import React, { Component } from 'react';
import {View, Text, StyleSheet, Picker, AppState} from 'react-native';
import PushController from './PushController';
import PushNotification from 'react-native-push-notification';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 5,
    };
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
  }
  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(appState){
    if(appState === 'background') {
      PushNotification.localNotificationSchedule({
        message: "My Notification Message", // (required)
        date: new Date(Date.now() + (this.state.seconds * 1000)) // in this.state secs
      });
      //console.log('app is in background', this.state.seconds)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Choose your time in seconds</Text>
        <Picker
          style={styles.picker}
          selectedValue={this.state.seconds}
          onValueChange={(seconds) => this.setState({seconds: seconds})}
        >
          <Picker.Item label="5" value={5} />
          <Picker.Item label="10" value={10} />
        </Picker>
        <PushController/>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  picker: {
    width: 100,
  }
});
