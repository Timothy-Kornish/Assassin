export function login(username, token) {
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

export function joinroom(roomCode) {
  return {
    type: 'joinroom',
    roomCode,
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
