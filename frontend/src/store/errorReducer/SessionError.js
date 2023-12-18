const RECEIVE_SESSION_ERRORS = "session/RECEIVE_SESSION_ERRORS";
const CLEAR_SESSION_ERRORS = "session/CLEAR_SESSION_ERRORS";
import { RECEIVE_CURRENT_USER } from "../session";

export const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
  });

export const clearSessionErrors = () => ({
    type: CLEAR_SESSION_ERRORS
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
