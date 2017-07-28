import {connect} from 'react-redux'

const mapStateToProps = (state) => {
  return {
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
