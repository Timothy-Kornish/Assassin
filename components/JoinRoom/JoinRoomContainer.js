import React, {Component} from 'react'
import {Button, View, Text} from 'react-native'
import {connect} from 'react-redux'
import JoinRoom from './JoinRoom.js'



const mapStateToProps = (state) => {
  return {
    username: state.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    roomCode: () =>{dispatch({ type: 'joinroom'})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinRoom)
