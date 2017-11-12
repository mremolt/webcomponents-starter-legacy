import { createSelector } from 'reselect';
import { User, IUser } from './user.class';
import { IState } from '../../backend/root.reducer';

export function rawUsersSelector(state: IState): IUser[] {
  return state.users.entities;
}

export const usersSelector = createSelector([rawUsersSelector], rawUsers => {
  return rawUsers.map((rawUser: IUser) => new User(rawUser));
});

export function rawUserSelector(state: IState): IUser {
  return state.currentUser.entity;
}

export const userSelector = createSelector(
  [rawUserSelector],
  (rawUser: IUser) => {
    return new User(rawUser);
  }
);
