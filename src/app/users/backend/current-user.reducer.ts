import { Map, fromJS } from 'immutable';
import { AnyAction } from 'redux';
import { USER_FETCH_FULFILLED, USER_FETCH_PENDING } from './users.actions';

const initialState = fromJS({
  loading: false,
  error: null,
  entity: {},
});

export function currentUserReducer(
  state: Map<string, any> = initialState,
  action: AnyAction
): Map<string, any> {
  switch (action.type) {
    case USER_FETCH_PENDING:
      return initialState.merge({ loading: true });

    case USER_FETCH_FULFILLED:
      return state.merge(
        fromJS({
          loading: false,
          entity: action.payload,
        })
      );
  }

  return state;
}
