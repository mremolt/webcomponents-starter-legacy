import { Reducer, AnyAction } from 'redux';
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';

import { usersReducer, IUsersState } from '../users/backend/users.reducer';
import { LOCATION_CHANGE, ROUTE_UPDATE } from '../constants';
import {
  currentUserReducer,
  ICurrentUserState,
} from '../users/backend/current-user.reducer';

export const initialState = { context: null, element: null, route: '' };

export function routesReducer(
  state: object = initialState,
  action: AnyAction
): object {
  switch (action.type) {
    case LOCATION_CHANGE:
      return {
        ...state,
        ...action.payload,
        route: action.payload.context.pathname,
      };

    case ROUTE_UPDATE:
      return { ...state, route: action.payload };
  }

  return state;
}

export interface IState {
  routes: any;
  users: IUsersState;
  currentUser: ICurrentUserState;
}

const config = {
  key: 'root',
  storage,
};

export const rootReducer: Reducer<any> = persistCombineReducers(config, {
  routes: routesReducer,
  users: usersReducer,
  currentUser: currentUserReducer,
});
