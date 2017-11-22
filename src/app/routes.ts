import * as page from 'page';

import { LOCATION_CHANGE } from './constants';

import { routeSelector } from './backend/routes.selectors';
import { Store } from 'redux';
import { IState } from './backend/root.reducer';

export function renderPage(
  element: Constructor<any>,
  context: any,
  store: Store<IState>
) {
  store.dispatch({ type: LOCATION_CHANGE, payload: { element, context } });
}

export function setupRoutes(store: Store<IState>): void {
  page.base('/');

  page('/', async context => {
    const m = await import(/* webpackChunkName: "home-page.element" */ './home');
    renderPage(m.HomePageElement, context, store);
  });

  page('users', async context => {
    const m = await import(/* webpackChunkName: "users-page.element" */ './users');
    renderPage(m.UsersPageElement, context, store);
  });

  page('users/new', async context => {
    const m = await import(/* webpackChunkName: "user-new-page.element" */ './users');
    renderPage(m.UserNewPageElement, context, store);
  });

  page('users/:id', async context => {
    const m = await import(/* webpackChunkName: "user-detail-page.element" */ './users');
    renderPage(m.UserDetailPageElement, context, store);
  });

  page('users/:id/edit', async context => {
    const m = await import(/* webpackChunkName: "user-edit-page.element" */ './users');
    renderPage(m.UserEditPageElement, context, store);
  });

  page('foo/:bar', async context => {
    const m = await import(/* webpackChunkName: "foo-bat.element" */ './pages/foo-bar.element');
    renderPage(m.FooBarElement, context, store);
  });

  page();
}

export function setupRouteActionListener(store: Store<IState>) {
  let prevRoute: string;

  store.subscribe(() => {
    const route = routeSelector(store.getState());
    setTimeout(() => {
      if (route && route !== window.location.pathname && route !== prevRoute) {
        page.redirect(route);
      }
      prevRoute = route;
    });
  });
}
