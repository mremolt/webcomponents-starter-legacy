import * as page from 'page';

import { store } from './backend/store';

import { UsersPageElement } from './users/users-page.element';
import { HomePageElement } from './home/home-page.element';
import { FooBarElement } from './pages/foo-bar.element';
import { UserDetailPageElement } from './users/user-detail-page';

export function renderPage(element: Constructor<HTMLElement>) {
  return (context: any) => {
    store.dispatch({ type: 'LOCATION_CHANGE', payload: { element, context } });
  };
}

export function setupRoutes(): void {
  page.base('/');

  page('/', renderPage(HomePageElement));
  page('users', renderPage(UsersPageElement));
  page('users/:id', renderPage(UserDetailPageElement));
  page('foo/:bar', renderPage(FooBarElement));

  page();
}
