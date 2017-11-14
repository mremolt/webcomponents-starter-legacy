import '@webcomponents/custom-elements';

import { setupRoutes } from './app/routes';
import { store } from './app/backend/store';

import './app/app.element';
import './app/header/header.element';

setupRoutes(store);
