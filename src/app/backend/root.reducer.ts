import { Map, fromJS } from 'immutable';
import { Reducer, AnyAction } from 'redux';
import { combineReducers } from 'redux-immutable';
import { usersReducer } from '../users/backend/users.reducer';
import { currentUserReducer } from '../users/backend/current-user.reducer';

export const initialState = fromJS({});

export function routesReducer(
  state: Map<string, any> = initialState,
  action: AnyAction
): Map<string, any> {
  switch (action.type) {
    case 'LOCATION_CHANGE':
      return fromJS(action.payload);
  }

  return state;
}

export const rootReducer: Reducer<Map<string, any>> = combineReducers({
  routes: routesReducer,
  users: usersReducer,
  currentUser: currentUserReducer,
});
