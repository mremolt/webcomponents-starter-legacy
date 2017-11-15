import i18next from 'i18next';

import de from './locale/de.json';
import en from './locale/en.json';

i18next.addResourceBundle('de', 'header', de);
i18next.addResourceBundle('en', 'header', en);

export * from './header.element';
