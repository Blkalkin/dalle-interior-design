import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import sessionReducer from './session';
import RootErrorReducer from './errorReducer/RootErrorReducer';
import userReducer from './user';
import projectReducer from './project';
import commentReducer from './comment';
import newImageReducer from './photoGen';

const rootReducer = combineReducers({
    //reducers
    session: sessionReducer,
    users: userReducer,
    errors: RootErrorReducer,
    projects: projectReducer,
    comments: commentReducer,
    newImages: newImageReducer 
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
