import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, View, Animated, Image, Easing  } from 'react-native';
import RNSimpleCompass from 'react-native-simple-compass';

export default class Compass extends Component {

  constructor(props) {
      super(props)
      this.state = {
        degree: 0
      }

      this.rotateValue = new Animated.Value(0);
      this.updateAngle = this.updateAngle.bind(this);
    }


  componentWillUnmount(){
    stopInterval(this.interval)
  }

  updateAngle() {
    const degree_update_rate = 3;

    RNSimpleCompass.start(degree_update_rate, (degree) => {
      console.log('You are facing', degree);
      (this.setState({degree: degree}))
      console.log("this.state.dgree ", this.state.degree)
      RNSimpleCompass.stop();
      console.log("animated?!!!! ")
    })
  }

  componentDidMount() {
    this.updateAngle()
    this.interval =setInterval(this.updateAngle, 200)
  }

  render() {
   return (<View>
          <Text>{"I'm a Compass"}</Text>
          <Animated.Image style={{width: 200, height: 200, transform:[{rotate:  - this.state.degree+"deg"}]}} source={require('./arrow.png')}/>
        </View>
    );
  }
}

const centering = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
