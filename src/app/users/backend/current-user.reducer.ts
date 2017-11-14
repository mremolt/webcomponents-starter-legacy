import { AnyAction } from 'redux';
import lensPath from 'ramda/src/lensPath';
import set from 'ramda/src/set';
import compose from 'ramda/src/compose';

import {
  USER_FETCH_FULFILLED,
  USER_FETCH_PENDING,
  USER_UPDATE_PENDING,
  USER_UPDATE_FULFILLED,
  USER_CREATE_PENDING,
  USER_CREATE_FULFILLED,
} from './users.actions';
import { IUser } from './user.class';

export interface ICurrentUserState {
  loading: boolean;
  error: Error | null;
  entity: IUser;
}

const initialState: ICurrentUserState = {
  loading: false,
  error: null,
  entity: { id: 0, firstname: '', lastname: '', email: '' },
};

export function currentUserReducer(
  state: ICurrentUserState = initialState,
  action: AnyAction
): ICurrentUserState {
  const loadingPath = lensPath(['loading']);
  const entityPath = lensPath(['entity']);

  switch (action.type) {
    case USER_FETCH_PENDING:
      return set(loadingPath, true, initialState) as ICurrentUserState;

    case USER_FETCH_FULFILLED:
      return compose(set(loadingPath, false), set(entityPath, action.payload))(
        state
      ) as ICurrentUserState;

    case USER_CREATE_PENDING:
      return set(loadingPath, true, state) as ICurrentUserState;

    case USER_CREATE_FULFILLED:
      return compose(set(loadingPath, false), set(entityPath, action.payload))(
        state
      ) as ICurrentUserState;

    case USER_UPDATE_PENDING:
      return set(loadingPath, true, state) as ICurrentUserState;

    case USER_UPDATE_FULFILLED:
      return compose(set(loadingPath, false), set(entityPath, action.payload))(
        state
      ) as ICurrentUserState;
  }

  return state;
}
