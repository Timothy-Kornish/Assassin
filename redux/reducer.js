export default function reducer(state, action){
  switch(action.type){
    case 'login':
      console.log("login reducer firing");
      return {
        ...state,
        username: action.username,
      }

    case 'authenticate':
      console.log('authenticate reducer is firing');
      return {
        ...state,
        token: action.token
      }
    case 'logout':
      console.log("logout reducer firing");
      return {
        ...state,
        username: undefined,
        token: undefined
      }

    case 'startTime':
      console.log("startTime reducer is firing");
      return {
        ...state,
        startTime: actions.startTime,

      }
    case 'endTime':
      console.log("endTime reducer is firing");
      return {
        ...state,
        endTime: actions.endTime
      }

    case 'locate':
      //console.log("locate reducer firing", action);
      return {
        ...state,
        longitude: action.longitude,
        latitude: action.latitude,
        locationError: action.error
      }
      case 'joinroom':
      console.log("joinroom reducer firing", action);
        return {
          ...state,
          roomCode: action.roomCode,
          username: action.username
        }
      case 'createroom':
        console.log("createroom reducer firing", action);
        return {
          ...state,
          roomCode: action.roomCode,
          roomCreator: action.username
        }
      case 'newAssignedTarget':
        return{
          ...state,
          target: action.target
        }
      case 'newPlayersWaiting':
        console.log("newPlayersWaiting is firing", action)
        return {
          ...state,
          waitingPlayers: action.players,
          roomCreator: action.creator
        }
      case 'newGhostRoom':
        return {
          ...state,
          ghostRoom : action.deadPlayers
        }
      case 'killTarget':
      console.log("killTarget is firing", action)
        return{
          ...state,
          target: state.target,
          targetsTarget: state.targetsTarget,
          targetDistance: state.target.distance,

        }
    default:
      return state
  }
}
