import { combineReducers } from "redux"
import authReducer from "./authReducer"
import statsReducer from "./statsReducer"

const rootReducer = combineReducers({
    auth: authReducer,
    statistics: statsReducer,
})

export default rootReducer;