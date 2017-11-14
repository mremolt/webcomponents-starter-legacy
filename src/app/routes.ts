import * as page from 'page';

import { LOCATION_CHANGE } from './constants';

import { routeSelector } from './backend/routes.selectors';
import { Store } from 'redux';
import { IState } from './backend/root.reducer';

export function renderPage(
  element: Constructor<HTMLElement>,
  store: Store<IState>
) {
  return (context: any) => {
    store.dispatch({ type: LOCATION_CHANGE, payload: { element, context } });
  };
}

export function renderAsync(
  element: Constructor<HTMLElement>,
  context: any,
  store: Store<IState>
) {
  store.dispatch({ type: LOCATION_CHANGE, payload: { element, context } });
}

export function setupRoutes(store: Store<IState>): void {
  page.base('/');

  page('/', async context => {
    const m = await import(/* webpackChunkName: "home-page.element" */ './home/home-page.element');
    renderAsync(m.HomePageElement, context, store);
  });
  // page('/', renderPage(HomePageElement));

  page('users', async context => {
    const m = await import(/* webpackChunkName: "users-page.element" */ './users/users-page.element');
    renderAsync(m.UsersPageElement, context, store);
  });
  // page('users', renderPage(UsersPageElement));

  page('users/new', async context => {
    const m = await import(/* webpackChunkName: "user-new-page.element" */ './users/user-new-page.element');
    renderAsync(m.UserNewPageElement, context, store);
  });
  // page('users/new', renderPage(UserNewPageElement));

  page('users/:id', async context => {
    const m = await import(/* webpackChunkName: "user-detail-page.element" */ './users/user-detail-page');
    renderAsync(m.UserDetailPageElement, context, store);
  });
  // page('users/:id', renderPage(UserDetailPageElement));

  page('users/:id/edit', async context => {
    const m = await import(/* webpackChunkName: "user-edit-page.element" */ './users/user-edit-page.element');
    renderAsync(m.UserEditPageElement, context, store);
  });
  // page('users/:id/edit', renderPage(UserEditPageElement));

  page('foo/:bar', async context => {
    const m = await import(/* webpackChunkName: "foo-bat.element" */ './pages/foo-bar.element');
    renderAsync(m.FooBarElement, context, store);
  });
  // page('foo/:bar', renderPage(FooBarElement));

  page();
}

export function setupRouteActionListener(store: Store<IState>) {
  store.subscribe(() => {
    const route = routeSelector(store.getState());
    setTimeout(() => {
      if (route !== window.location.pathname) {
        page.redirect(route);
      }
    });
  });
}
