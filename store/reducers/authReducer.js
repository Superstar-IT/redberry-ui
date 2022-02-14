import * as Types from "../types";


const authReducer = (state = {
    token: null
}, action) => {
  switch(action.type){
    case Types.LOGIN_SUCCESS:
      return { 
        ...state,
        token: action.payload
      };
    default:
      return {...state};
    }
}

export default authReducer;