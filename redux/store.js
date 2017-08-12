import{ createStore }from 'redux'
import reducer from './reducer'
// import devToolsEnhancer from 'remote-redux-devtools';

const defaultState = {
	waitingPlayers: [],
	deadPlayers: []
}

export default createStore(reducer, defaultState)
