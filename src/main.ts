// import '@webcomponents/custom-elements';

import { setupRoutes } from './app/routes';
import { store } from './app/backend/store';

import './app/locale/setup';
import './app/app.element';

setupRoutes(store);
