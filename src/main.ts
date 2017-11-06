import { setupRoutes } from './app/routes';

console.time('bootstrap');

import './app/app.element';
import './app/header/header.element';
import './app/users/user-show.element';

setupRoutes();
