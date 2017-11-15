import i18next from 'i18next';

import de from './locale/de.json';
import en from './locale/en.json';

i18next.addResourceBundle('de', 'users', de);
i18next.addResourceBundle('en', 'users', en);

export * from './user-detail-page';
export * from './user-edit-page.element';
export * from './user-form.element';
export * from './user-new-page.element';
export * from './user-show.element';
export * from './users-page.element';
