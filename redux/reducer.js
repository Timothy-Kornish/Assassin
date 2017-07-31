export default function reducer(state, action){
  switch(action.type){
    case 'login':
    console.log("login firing");
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
    case 'locate':
    console.log("locate reducer firing", action);
      return {
        ...state,
        longitude: action.longitude,
        latitude: action.latitude,
        locationError: action.error
      }
    default:
      return state
  }
}
