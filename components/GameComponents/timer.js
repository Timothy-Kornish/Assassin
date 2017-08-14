mport React, {Component} from 'react'
import {Button, View, Text, FlatList, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'
import {apiUrl} from '../localConfig'
import{startTime, endTime} from '../redux/actions'



let startTime = Date.now()

class Timer extends Component{



  //set the time to count down two minutes before allowing the player to kill his/her target

  //let hireable = 0
  //if(Date.now - startTime)/1000 > (two minutes){
  //???????
//}
  //cankill(){
  //fetch(apiURL + 'user/hireable', {
  //method: 'PUT',
  //headers: {
  //  'Content-Type': 'application/json'
  //  'x-access-token': this.props.token
//}
//})
//.then()
//}


  componentDidMount(){
      this.interval = setInterval(this.updatePlayers.bind(this), 3000)
      console.log("interval is firing every 3 seconds", (Date.now() - startTime) /1000)
    }


    componentWillUnmount(){
      clearInterval(this.interval)
    }



  render(){
    return(
      <View>
        <Text></Text>
      </View>

    )
  }


const mapStateToProps = (state) => ({
  token: state.token,
  startTime: state.startTime,
  endTime: state.endTime
})

const mapDispatchToProps = (dispatch) => {

}

const TimeConnector = connect(mapStateToProps, mapDispatchToProps)

export default TimerConnector(timer)
