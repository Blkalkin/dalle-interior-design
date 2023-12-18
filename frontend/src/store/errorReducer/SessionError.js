const RECEIVE_SESSION_ERRORS = "session/RECEIVE_SESSION_ERRORS";
const CLEAR_SESSION_ERRORS = "session/CLEAR_SESSION_ERRORS";
import { RECEIVE_USER_LOGOUT, RECEIVE_CURRENT_USER } from "../session";

const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
  });

const nullErrors = null;

export const sessionErrorsReducer = (state = nullErrors, action) => {
    switch(action.type) {
      case RECEIVE_SESSION_ERRORS:
        return action.errors;
      case RECEIVE_CURRENT_USER:
      case CLEAR_SESSION_ERRORS:
        return nullErrors;
      default:
        return state;
    }
  };
