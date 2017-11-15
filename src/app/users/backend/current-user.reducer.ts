import { AnyAction } from 'redux';
import lensPath from 'ramda/src/lensPath';
import set from 'ramda/src/set';
import compose from 'ramda/src/compose';

import {
  userFetchActions,
  userCreateActions,
  userUpdateActions,
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
    case userFetchActions.pending:
      return set(loadingPath, true, initialState) as ICurrentUserState;

    case userFetchActions.fulfilled:
      return compose(set(loadingPath, false), set(entityPath, action.payload))(
        state
      ) as ICurrentUserState;

    case userCreateActions.pending:
      return set(loadingPath, true, state) as ICurrentUserState;

    case userCreateActions.fulfilled:
      return compose(set(loadingPath, false), set(entityPath, action.payload))(
        state
      ) as ICurrentUserState;

    case userUpdateActions.pending:
      return set(loadingPath, true, state) as ICurrentUserState;

    case userUpdateActions.fulfilled:
      return compose(set(loadingPath, false), set(entityPath, action.payload))(
        state
      ) as ICurrentUserState;
  }

  return state;
}
