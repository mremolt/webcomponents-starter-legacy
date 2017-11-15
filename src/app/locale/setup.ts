import i18next from 'i18next';
import LngDetector from 'i18next-browser-languagedetector';

import de from './de.json';
import en from './en.json';

i18next.use(LngDetector).init({
  resources: {
    de: { translation: de },
    en: { translation: en },
  },
});
