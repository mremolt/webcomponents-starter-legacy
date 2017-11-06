import { List, Map } from 'immutable';
import { createSelector } from '../../utils/reselect';
import { User } from './user.class';

export function rawUsersSelector(
  state: Map<string, any>
): List<Map<string, any>> {
  return state.getIn(['users', 'entities']);
}

export const usersSelector = createSelector([rawUsersSelector], rawUsers => {
  return rawUsers.map((rawUser: any) => new User(rawUser));
});

export function rawUserSelector(
  state: Map<string, any>
): List<Map<string, any>> {
  return state.getIn(['currentUser', 'entity']);
}

export const userSelector = createSelector(
  [rawUserSelector],
  (rawUser: any) => {
    return new User(rawUser);
  }
);
