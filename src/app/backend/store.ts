import {
  createStore,
  applyMiddleware,
  Store,
  Middleware,
  compose,
} from 'redux';
import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';

import { rootReducer, IState } from './root.reducer';

let middleware: Middleware[] = [promiseMiddleware()];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

middleware =
  process.env.NODE_ENV !== 'production'
    ? [
        require('redux-immutable-state-invariant').default(),
        logger,
        ...middleware,
      ]
    : middleware;

export const store: Store<IState> = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(...middleware))
);
