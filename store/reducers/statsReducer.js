import * as Types from "../types";


const statsReducer = (state = {
    statistics: [],
    summary: null
}, action) => {
  switch(action.type){
    case Types.SET_STATISTICS:
      return { 
        ...state,
        statistics: action.payload
      };
    case Types.SET_SUMMRAY:
      return { 
        ...state,
        summary: action.payload
      };
    default:
      return {...state};
    }
}

export default statsReducer;