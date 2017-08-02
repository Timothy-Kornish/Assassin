import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Geolocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null
    };
    this.watchId = null

    setInterval(this.location.bind(this),1000)
  }
  const mapStateToProps(){
    this.location()
  }



  location(){
    //console.log(this.watchId)
    navigator.geolocation.clearWatch(this.watchId);

  const mapDispatchToProps(){

    this.watchId = navigator.geolocation.watchPosition(

      (position) => {
         //console.log("looking for cache ", navigator.geolocation.clearWatch)
        console.log("latitude: ",position.coords.latitude)
        console.log("longitude: ",position.coords.longitude)
        let obj = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        }
        this.setState(obj);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000},
    );

  }
  sendData(){
    return this.state
  }

  componentDidMount() {
    this.location()
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {
    return (
      <div>
        <Text> You are here: {this.props.latitude, this.props.longitude}</Text>
      </div>
    );
  }
}

}


      export default Geolocate;
