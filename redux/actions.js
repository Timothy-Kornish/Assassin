export const login = (username, token) => {
  return {
    type: 'login',
    username,
    token
  }
}
export const logout = () => {
  return {
    type: 'logout'
  }
}
