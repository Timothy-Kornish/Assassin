import {connect} from 'react-redux'

const mapStateToProps = (state) => {
  return {
    username: state.username,
    target: state.target;
    targetsTarget: state.targetsTarget
    isAlive : state.isAlive,
    targetDistance: state.target.distance
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    kill : () => {
      dispatch({
        type: "kill"
      })
    }
  }
}

const KillConnector = connect(mapStateToProps, mapDispatchToProps)
