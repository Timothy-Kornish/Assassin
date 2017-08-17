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
        token: undefined,
        latitude: undefined,
        longitude: undefined,
        locationError: undefined,
        roomCode: undefined,
        roomCreator: undefined,
        waitingPlayers: undefined,
        roomCreator: undefined,
        target: undefined,
        targetsTarget: undefined,
        ghostRoom: undefined,
        targetDistance: undefined,
        theta: undefined,
        distance: undefined,
        deadPlayers: undefined,
        listObj: undefined,
        time: undefined
      }
    case 'locate':
      //console.log("locate reducer firing", action);
      return {
        ...state,
        longitude: action.longitude,
        latitude: action.latitude,
        locationError: action.error
      }
      case 'createroom':
        console.log("createroom reducer firing", action);
        return {
          ...state,
          roomCode: action.roomCode,
          roomCreator: action.username
        }
      case 'joinroom':
        console.log("joinroom reducer firing", action);
        return {
          ...state,
          roomCode: action.roomCode,
          username: action.username
        }
      case 'newPlayersWaiting':
        console.log("newPlayersWaiting is firing", action)
        return {
          ...state,
          waitingPlayers: action.players,
          roomCreator: action.creator
        }
      case 'newAssignedTarget':
        return{
          ...state,
          target: action.target
        }
      case 'newHeartBeat':
        console.log("heartbeat is thumpin", action)
          return{
            ...state,
            theta: action.theta,
            distance: action.distance,
            target: action.target,
            targetsTarget: action.targetsTarget,
            listObj: action.listObj,
            hireable: action.hireable
          }
      case 'newTime':
        console.log("time is ticking", action)
           return{
            ...state,
            time: action.time
          }
      case 'killTarget':
      console.log("killTarget is firing", action)
        return{
          ...state,
          target: action.target,
          targetsTarget: action.targetsTarget,
          targetDistance: action.target.distance,
        }
      case 'newGhostRoom':
        return {
          ...state,
          deadPlayers : action.deadPlayers
        }
      case 'newLoadPlayers':
        return{
          ...state,
          active: action.active
        }
    default:
      return state
  }
}
