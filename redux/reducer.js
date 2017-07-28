export default function reducer(state, action){
  switch(action.type){
    case 'login':
      return {
        ...state,
        username: action.username,
        token: action.token
      }
    case 'logout':
      return {
        ...state,
        username: undefined,
        token: undefined
      }
    default:
      return state
  }
}
