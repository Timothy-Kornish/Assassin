import React, {Component} from 'react'
import {Button, View} from 'react-native'
import {logout} from '../redux/actions'
import {connect} from 'react-redux'

class Logout extends Component {
  render(){
    if (this.props.username) {
      return <Button onClick={this.props.logout}>Logout</Button>
    } else {
      return <View></View>
    }
  }
}

const mapStateToProps = (state) => {
  return {
    username : state.username
  }
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
