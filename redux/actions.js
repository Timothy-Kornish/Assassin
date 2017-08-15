export function login(username, token) {
  console.log("login action firiing", token, username)
  return {
    type: 'login',
    username,
    token
  }
}
export function logout(){
  return {
    type: 'logout'
  }
}
export function locate(latitude, longitude, error) {
  return {
  	type: 'locate',
  	longitude,
  	latitude,
  	error
  }
}
export function createroom(roomCode, username) {
  return {
    type: 'createroom',
    roomCode,
    roomCreator: username
  }
}
export function joinroom(roomCode, username) {
  return {
    type: 'joinroom',
    roomCode,
    username
  }
}
export function newPlayersWaiting(players, creator){
  return {
    type: 'newPlayersWaiting',
    players,
    creator
  }
}
export function newAssignedTarget(target){
  return {
    type: 'newAssignedTarget',
    target
  }
}
export function killTarget(target, username, targetsTarget){
  return {
    type: 'killTarget',
    target,
    username,
    targetsTarget
    //something else
  }
}
export function ghostRoom(deadPlayers){
  return {
    type: 'newGhostRoom',
    deadPlayers
  }
}

export function newHeartBeat(theta, distance, target, targetsTarget, listObj){
  return {
    type: 'newHeartBeat',
    theta,
    distance,
    target,
    targetsTarget,
    listObj
  }
}

export function newTime(time){

  return {
    type: 'newTime',
    time
  }
}
