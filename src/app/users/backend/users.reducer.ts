import { Map, fromJS } from 'immutable';
import { AnyAction } from 'redux';
import { USERS_FETCH_FULFILLED, USERS_FETCH_PENDING } from './users.actions';

const initialState = fromJS({
  loading: false,
  error: null,
  entities: [],
});

export function usersReducer(
  state: Map<string, any> = initialState,
  action: AnyAction
): Map<string, any> {
  switch (action.type) {
    case USERS_FETCH_PENDING:
      return state.merge(
        fromJS({
          loading: true,
          error: null,
          entities: [],
        })
      );

    case USERS_FETCH_FULFILLED:
      return state.merge(
        fromJS({
          loading: false,
          entities: action.payload,
        })
      );
  }

  return state;
}
