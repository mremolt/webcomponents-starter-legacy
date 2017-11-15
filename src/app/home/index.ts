import i18next from 'i18next';

import de from './locale/de.json';
import en from './locale/en.json';

i18next.addResourceBundle('de', 'home', de);
i18next.addResourceBundle('en', 'home', en);

export * from './home-page.element';
