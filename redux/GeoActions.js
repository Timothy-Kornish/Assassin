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

export function locate(longitude, latitude, watchId, error) {
	console.log("inlocate actions", longitude);
  return {
  	type: 'locate',
  	longitude,
  	latitude,
  	watchId,
 
  }
}
