import React, {Component} from 'react'
import {Button, View} from 'react-native'
import {logout} from '../redux/actions'
import {connect} from 'react-redux'

class Logout extends Component {

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
  }
}

const mapStateToProps = (state) => {
  return {
    username : state.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout : () => {dispatch(logout())}
  }
}

const LogoutConnector = connect(mapStateToProps, mapDispatchToProps)

export default LogoutConnector(Logout)
