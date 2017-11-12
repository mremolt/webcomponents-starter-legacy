import { Reducer, AnyAction, combineReducers } from 'redux';

import { usersReducer, IUsersState } from '../users/backend/users.reducer';
import { LOCATION_CHANGE } from '../constants';
import {
  currentUserReducer,
  ICurrentUserState,
} from '../users/backend/current-user.reducer';

export const initialState = {};

export function routesReducer(
  state: object = initialState,
  action: AnyAction
): object {
  switch (action.type) {
    case LOCATION_CHANGE:
      return action.payload;
  }

  return state;
}

export interface IState {
  routes: any;
  users: IUsersState;
  currentUser: ICurrentUserState;
}

export const rootReducer: Reducer<any> = combineReducers({
  routes: routesReducer,
  users: usersReducer,
  currentUser: currentUserReducer,
});
