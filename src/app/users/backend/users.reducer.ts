import { AnyAction } from 'redux';
import { USERS_FETCH_FULFILLED, USERS_FETCH_PENDING } from './users.actions';
import lensPath from 'ramda/src/lensPath';
import set from 'ramda/src/set';
import compose from 'ramda/src/compose';
import { IUser } from './user.class';

export interface IUsersState {
  loading: boolean;
  error: Error | null;
  entities: IUser[];
}

const initialState: IUsersState = {
  loading: false,
  error: null,
  entities: [],
};

export function usersReducer(
  state: IUsersState = initialState,
  action: AnyAction
): IUsersState {
  const loadingPath = lensPath(['loading']);
  const entitiesPath = lensPath(['entities']);

  switch (action.type) {
    case USERS_FETCH_PENDING:
      return set(loadingPath, true, initialState) as IUsersState;

    case USERS_FETCH_FULFILLED:
      return compose(
        set(loadingPath, false),
        set(entitiesPath, action.payload)
      )(state) as IUsersState;
  }

  return state;
}
