import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import Geolocation from "./geolocation"

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Geolocation/>
        <Text>Hello world!</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => HelloWorldApp);
