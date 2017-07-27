import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Animated, Image, Easing } from 'react-native';
const { DeviceEvenEmitter } = require('react-native');
const ReactNativeHeading = require('react-native-heading');
import RNSimpleCompass from 'react-native-simple-compass';
console.log("reactNativeHead ", ReactNativeHeading)
// const { UIManager } = NativeModules;
// UIManager.setLayoutAnimationEnabledExperimental &&
// UIManager.setLayoutAnimationEnabledExperimental(true);

export default class Compass extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      heading : '',
      degree: ''
    }
    this.rotateValue = new Animated.Value(0);
  }



  componentDidMount() {
    // ReactNativeHeading.start(1)
	  //  .then(didStart => {
		//      this.setState({
		// 	        headingIsSupported: didStart,
    //       })
    //   })
    //  DeviceEvenEmitter.addListener('headingUpdated', data =>{
    //   console.log('new heading is: ', data.heading);
    //   })
    //
    //
    // .then( this.setState(bearing: data.heading))
    const degree_update_rate = 3; // Number of degrees changed before the callback is triggered
    RNSimpleCompass.start(degree_update_rate, (degree) => {
      console.log('You are facing', degree);
      RNSimpleCompass.stop();
      //.then( this.setState({degree: degree}));
    });



    .then(this.startAnimation());
  }

  startAnimation() {
    this.rotateValue.setValue(0);
    Animated.timing(this.rotateValue, {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear
    }).start(() => this.startAnimation());
  }

  componetWillUnmount(){
    ReactNativeHeading.stop();
    DeviceEvenEmitter.removeAllListeners('headingUpdated');
  }

  render() {
    var spin = this.rotateValue.interpolate({
     inputRange: [0, 1],
     outputRange: ['0deg', '360deg']
   });
   return (

        <View style={styles.container}>
          <Animated.Image style={{width: 150, height: 150, transform:[{rotate: spin}]}} source={require('./arrow.png')}/>
        </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aaf',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
