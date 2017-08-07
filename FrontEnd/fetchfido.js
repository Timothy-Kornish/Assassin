import React, { Component } from 'react'
import 'whatwg-fetch'


export default class Fetchfido extends Component {
  constructor(props){
  super(props)

}
  openLobby (){
    fetch('/lobby', {
     method: 'PUT',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({roomCode: roomCode})

     })


  }

  componentDidMount(){
    this.openLobby()
  }

  goToYourRoom(){
    fetch('/room', {
      method: 'GET',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({roomCode: roomCode})
    })
  }

  lockAndLoad(){
    fetch('/gameStart', {
      method: 'PUT',
    })
  }

  winner(){
    fetch('/loneVictor', {
      method: 'GET'
    })

  }



  render(){
    return(
      <div>Game screen stuff goes here! May the odds be ever in your favor, and may the force be with you!</div>
    )

  }
}
