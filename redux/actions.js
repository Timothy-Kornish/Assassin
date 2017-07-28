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
