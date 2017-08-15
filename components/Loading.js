import React, {Component} from 'react'
import {Button, View, Text} from 'react-native'
import {connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'
import {apiUrl} from '../localConfig'

class Loading extends Component {


 pressButton(){
    var self = this;
    fetch(apiUrl + '/user/startCountDown', {
     method: 'PUT',
     headers: {
       'Content-Type': 'application/json',
       'x-access-token' : this.props.token
     },
        body: JSON.stringify({
          roomCode: this.props.roomCode,
          username: this.props.username

        })
    })
    .then(()=>self.props.navigation.navigate('Game'))
 }


 render(){
    return (
     <View>
       <Text>From the offices of Gamboni and Valenicci</Text>
       <Text> In the matter of the estate of "Mother"...
         NOTICE TO HEIRS
         To the heirs and devices of the above named estate, this is a formal notice that your aunt,
         known as "Mother", has died, and you may have an interest in Mother's estate.
         Mother's estate is estimated at the value of 2.7 billion US dollars. She has
         stipulated in her last will and testament that the estate shall not be divided, but bequeathed upon
         a single heir.  The heir shall be determined at a date when only one living next
         of kin remains. You have been named as a potential heir....but there is another.
         Your mission, {this.props.username}, is to eliminate {this.props.target}.
         The assets of the Estate of "Mother" will be dispursed upon your victory should you
         accept.....and survive. All recipients of this Notice are hereby informed that each is
         entitled to nothing until the wishes of "Mother" have been successfully carried out.
         In the event that you refuse you shall be eliminated from the pool of potential heirs
         and permentantly and irrevocably disinherited. Press continue to accept.
         With regards and best wishes,
         Gamboni and Valenicci LLC
       </Text>
       <Button onPress={this.pressButton.bind(this)} title={'Continue'}/>
      </View>
     )
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  roomCode: state.roomCode,
  username: state.username,
  target: state.target
})

const LoadingConnector = connect(mapStateToProps)

export default LoadingConnector(Loading)
