import { combineReducers } from "redux";
import usersReducer from "./usersReducers";


export const rootReducer = combineReducers({
  users: usersReducer,
})
