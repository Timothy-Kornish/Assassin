
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
    console.log("locate firing", action);
      return {
        ...state,
        longitude: action.longitude,
        latitude: action.latitude,
        locationerror: action.error,

      }
    default:
      return state
  }
}
