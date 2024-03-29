import { AnyAction } from 'redux';
import {
  usersFetchActions,
  userDeleteActions,
  userCreateActions,
  userUpdateActions,
} from './users.actions';
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
    case usersFetchActions.pending:
      return set(loadingPath, true, state) as IUsersState;

    case usersFetchActions.fulfilled:
      return compose(
        set(loadingPath, false),
        set(entitiesPath, action.payload)
      )(state) as IUsersState;

    case userDeleteActions.fulfilled:
      const entities = state.entities.filter(e => e.id !== action.payload);
      return { ...state, entities };

    case userCreateActions.fulfilled:
      return { ...state, entities: [...state.entities, action.payload] };

    case userUpdateActions.fulfilled:
      return {
        ...state,
        entities: state.entities.map(e => {
          if (action.payload.id === e.id) {
            return action.payload;
          }
          return e;
        }),
      };
  }

  return state;
}
