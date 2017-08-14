export default function reducer(state, action){
  switch(action.type){
    case 'login':
      console.log("login reducer firing");
      return {
        ...state,
        username: action.username,
        token: action.token
      }
    case 'logout':
      console.log("logout reducer firing");
      return {
        ...state,
        username: undefined,
        token: undefined
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
          target: action.target,
          targetsTarget: action.targetsTarget,
          targetDistance: action.target.distance,
        }
      case 'newHeartBeat':
        console.log("heartbeat is thumpin", action)
          return{
            ...state,
            theta: action.theta,
            distance: action.distance,
            target: action.target,
            targetsTarget: action.targetsTarget,
            listObj: action.listObj
          }
      case 'newTime':
        console.log("time is ticking", action)
          return{
            ...state,
            time: action.time
          }
    default:
      return state
  }
}
