import { createAction, createReducer } from "@reduxjs/toolkit";
import { ADD_NEW_USER } from "../redux/types";

const initialState = {
  users: []
}

export const addNewUser = createAction( ADD_NEW_USER )

export default createReducer(initialState,  {
[addNewUser]: function(state) {
  // state.users = state.users.push(newUser)//завести нового пользователя
}
})
