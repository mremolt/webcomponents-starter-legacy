import { AnyAction } from 'redux';
import axios from 'axios';

export const USERS_FETCH = 'USERS_FETCH';
export const USERS_FETCH_PENDING = 'USERS_FETCH_PENDING';
export const USERS_FETCH_FULFILLED = 'USERS_FETCH_FULFILLED';
export const USER_FETCH = 'USER_FETCH';
export const USER_FETCH_PENDING = 'USER_FETCH_PENDING';
export const USER_FETCH_FULFILLED = 'USER_FETCH_FULFILLED';

export function fetchUsers(): AnyAction {
  return {
    type: USERS_FETCH,
    payload: axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        return response.data;
      }),
  };
}

export function fetchUser(id: string): AnyAction {
  return {
    type: USER_FETCH,
    payload: axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => {
        return response.data;
      }),
  };
}
