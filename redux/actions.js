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
	console.log("locate actions firing", longitude);
  return {
  	type: 'locate',
  	longitude,
  	latitude,
  	error
  }
}