import {
  createStore,
  applyMiddleware,
  Store,
  Middleware,
  compose,
} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import { rootReducer, IState } from './root.reducer';

let middleware: Middleware[] = [promiseMiddleware(), thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

middleware =
  process.env.NODE_ENV !== 'production'
    ? [
        require('redux-immutable-state-invariant').default(),
        require('redux-logger').default,
        ...middleware,
      ]
    : middleware;

export const store: Store<IState> = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(...middleware))
);
