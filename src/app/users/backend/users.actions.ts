import { AnyAction } from 'redux';
import axios from 'axios';
import { environment } from '../../../environment';
import { IUser } from './user.class';
import { Dispatch } from 'redux';
import { ROUTE_UPDATE } from '../../constants';
import { ThunkAction } from 'redux-thunk';
import { IState } from '../../backend/root.reducer';

export const USERS_BASE_URL: string = `${environment.apiUrl}/users`;

export const USERS_FETCH = 'USERS_FETCH';
export const USERS_FETCH_PENDING = 'USERS_FETCH_PENDING';
export const USERS_FETCH_FULFILLED = 'USERS_FETCH_FULFILLED';

export const USER_FETCH = 'USER_FETCH';
export const USER_FETCH_PENDING = 'USER_FETCH_PENDING';
export const USER_FETCH_FULFILLED = 'USER_FETCH_FULFILLED';

export const USER_CREATE = 'USER_CREATE';
export const USER_CREATE_PENDING = 'USER_CREATE_PENDING';
export const USER_CREATE_FULFILLED = 'USER_CREATE_FULFILLED';

export const USER_UPDATE = 'USER_UPDATE';
export const USER_UPDATE_PENDING = 'USER_UPDATE_PENDING';
export const USER_UPDATE_FULFILLED = 'USER_UPDATE_FULFILLED';

export const USER_DELETE = 'USER_DELETE';
export const USER_DELETE_PENDING = 'USER_DELETE_PENDING';
export const USER_DELETE_FULFILLED = 'USER_DELETE_FULFILLED';

export function fetchUsers(): AnyAction {
  return {
    type: USERS_FETCH,
    payload: axios.get(USERS_BASE_URL).then(response => {
      return response.data;
    }),
  };
}

export function fetchUser(id: string): AnyAction {
  return {
    type: USER_FETCH,
    payload: axios.get(`${USERS_BASE_URL}/${id}`).then(response => {
      return response.data;
    }),
  };
}

export function createUser(user: IUser): ThunkAction<any, IState, any> {
  return (dispatch: Dispatch<IState>) => {
    const promise = axios.post(USERS_BASE_URL, user).then(response => {
      return response.data;
    });

    dispatch({
      type: USER_CREATE,
      payload: promise,
    });

    promise.then(() => {
      dispatch({ type: ROUTE_UPDATE, payload: '/users' });
    });
  };
}

export function updateUser(user: IUser): AnyAction {
  return {
    type: USER_UPDATE,
    payload: axios.put(`${USERS_BASE_URL}/${user.id}`, user).then(response => {
      return response.data;
    }),
  };
}

export function deleteUser(id: string): AnyAction {
  return {
    type: USER_DELETE,
    payload: axios.delete(`${USERS_BASE_URL}/${id}`).then(response => {
      return id;
    }),
  };
}
