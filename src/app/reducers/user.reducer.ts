import { User } from '../class/user';

export const ADD_USER = "ADD"

export function userReducer(state, action) {
  if (action.type === ADD_USER) {
    return action.payload;
  } else {
    return state;
  }
}