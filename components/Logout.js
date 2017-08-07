import React, {Component} from 'react'
import {Button, View, TextInput, AppRegistry, Text} from 'react-native'
import {login} from '../redux/actions'
import {connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'


class Logout extends Component {
  logout(){
    fetch('/logout', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({username: this.username})
    })
  }

  render(){
    <View>
      {this.props.username}
        return <Button onPress={this.props.logout} title="Logout"/>

        </View>
    }
  }
}

// const mapStateToProps = (state) => {
//   return {
//     username : state.auth.username
//
//   }

}

const mapDispatchToProps = (dispatch) => {
  return {
    logout : () => {
      dispatch(logout())
    }
  }
}

const LogoutConnector = connect(mapStateToProps, mapDispatchToProps)

export default LogoutConnector(Logout)
