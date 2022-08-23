import { ADD_NEW_USER } from "../types";

function usersReducer (state =[], action) {
  console.log(state, "state")
const {type, payload } = action;
switch(type){
  case ADD_NEW_USER: {
    console.log(payload, 'payload')
return [...state, payload]
  }
  default: {
    return state;
  }
}
}

export default usersReducer
