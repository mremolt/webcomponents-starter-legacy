import { createStore, Store, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import { Map } from 'immutable';

import { rootReducer } from './root.reducer';

const stateTransformer = (state: any) => {
  return state.toJS();
};

const logger = createLogger({
  stateTransformer,
});

export const store: Store<Map<string, any>> = createStore(
  rootReducer,
  Map({}),
  applyMiddleware(logger, promiseMiddleware())
);
