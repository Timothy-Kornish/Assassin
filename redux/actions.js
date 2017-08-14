export function login(username) {
  return {
    type: 'login',
    username,
  }
}

export function authenticate(token) {
  return {
    type: 'authenticate',
    token
  }
}
export function logout(){
  return {
    type: 'logout'
  }
}

export function startTime() {
  return {
    type: 'startTime'
  }
}

export function endTime() {
  return {
    type: 'endTime'
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

export function joinroom(roomCode, username) {
  return {
    type: 'joinroom',
    roomCode,
    username
  }
}

export function createroom(roomCode, username) {
  return {
    type: 'createroom',
    roomCode,
    roomCreator: username
  }
}

export function newAssignedTarget(target){
  return {
    type: 'newAssignedTarget',
    target
  }
}
export function newPlayersWaiting(players, creator){
  return {
    type: 'newPlayersWaiting',
    players,
    creator
  }
}

export function ghostRoom(deadPlayers){
  return {
    type: 'newGhostRoom',
    deadPlayers
  }
}

export function killTarget(target, username, targetsTarget){
  type: 'killTarget',
  target,
  username,
  targetsTarget
  //something else
}
