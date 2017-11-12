import * as page from 'page';

import { store } from './backend/store';
import { LOCATION_CHANGE } from './constants';

import { UsersPageElement } from './users/users-page.element';
import { HomePageElement } from './home/home-page.element';
import { FooBarElement } from './pages/foo-bar.element';
import { UserDetailPageElement } from './users/user-detail-page';
import { UserEditPageElement } from './users/user-edit-page.element';

export function renderPage(element: Constructor<HTMLElement>) {
  return (context: any) => {
    store.dispatch({ type: LOCATION_CHANGE, payload: { element, context } });
  };
}

export function setupRoutes(): void {
  page.base('/');

  page('/', renderPage(HomePageElement));
  page('users', renderPage(UsersPageElement));
  page('users/:id', renderPage(UserDetailPageElement));
  page('users/:id/edit', renderPage(UserEditPageElement));
  page('foo/:bar', renderPage(FooBarElement));

  page();
}
