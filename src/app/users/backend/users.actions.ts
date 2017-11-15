import { AnyAction } from 'redux';
import { environment } from '../../../environment';
import { IUser } from './user.class';
import { Dispatch } from 'redux';
import { ROUTE_UPDATE } from '../../constants';
import { ThunkAction } from 'redux-thunk';
import { IState } from '../../backend/root.reducer';
import {
  httpGet,
  httpPost,
  httpPut,
  httpDelete,
  generateAsyncActionNames,
} from '../../utils/rest';

export const USERS_BASE_URL: string = `${environment.apiUrl}/users`;

export const usersFetchActions = generateAsyncActionNames('USERS_FETCH');
export const userFetchActions = generateAsyncActionNames('USER_FETCH');
export const userCreateActions = generateAsyncActionNames('USER_CREATE');
export const userUpdateActions = generateAsyncActionNames('USER_UPDATE');
export const userDeleteActions = generateAsyncActionNames('USER_DELETE');

export function fetchUsers(): AnyAction {
  return {
    type: usersFetchActions.base,
    payload: httpGet(USERS_BASE_URL),
  };
}

export function fetchUser(id: string): AnyAction {
  return {
    type: userFetchActions.base,
    payload: fetch(`${USERS_BASE_URL}/${id}`).then(response => {
      return response.json();
    }),
  };
}

export function createUser(user: IUser): ThunkAction<any, IState, any> {
  return (dispatch: Dispatch<IState>) => {
    const promise = httpPost(USERS_BASE_URL, user);
    dispatch({
      type: userCreateActions.base,
      payload: httpPost(USERS_BASE_URL, user),
    });

    promise.then(() => {
      dispatch({ type: ROUTE_UPDATE, payload: '/users' });
    });
  };
}

export function updateUser(user: IUser): AnyAction {
  return {
    type: userUpdateActions.base,
    payload: httpPut(`${USERS_BASE_URL}/${user.id}`, user),
  };
}

export function deleteUser(id: string): AnyAction {
  return {
    type: userDeleteActions.base,
    payload: httpDelete(`${USERS_BASE_URL}/${id}`).then(() => id),
  };
}
