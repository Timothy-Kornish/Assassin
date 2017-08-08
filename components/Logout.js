import React, {Component} from 'react'
import {Button, View} from 'react-native'
import {logout} from '../redux/actions'
import {connect} from 'react-redux'

class Logout extends Component {
<<<<<<< HEAD
  logout(){
    //need to see login in page so I know what to set to null #undefined
  }

  render(){
    return(
      <View>
        {this.props.username}
        <Button onPress={()=>this.props.navigation.navigate('Lobby')} title="Log out"/>
      </View>
      )
=======
  render(){
    if (this.props.username) {
      return <Button onPress={this.props.logout} title="Logout"/>
    } else {
      return <View></View>
>>>>>>> 77d7728affdea42a230169a45ff97d4136d01af2
    }
  }

<<<<<<< HEAD
=======
const mapStateToProps = (state) => {
  return {
    username : state.username
  }
}
>>>>>>> 77d7728affdea42a230169a45ff97d4136d01af2

const mapDispatchToProps = (dispatch) => {
  return {
    logout : () => {dispatch(logout())}
  }
}

const LogoutConnector = connect(mapStateToProps, mapDispatchToProps)

export default LogoutConnector(Logout)
