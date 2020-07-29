import { applyMiddleware, compose, combineReducers, createStore } from "redux";
import {createBrowserHistory} from 'history';
import socketMiddleware from './socket/socket-middleware';
import timer from './socket/socket-reducers';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  timer
});

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      socketMiddleware
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);
