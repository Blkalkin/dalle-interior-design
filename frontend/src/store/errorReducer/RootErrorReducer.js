import { combineReducers } from 'redux';
import { sessionErrorsReducer } from './SessionError';

const RootErrorReducer = combineReducers({
  session: sessionErrorsReducer,
});

export default RootErrorReducer
