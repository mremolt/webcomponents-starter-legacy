import { translator } from '../translator';
import de from './locale/de.json';
import en from './locale/en.json';

translator.addTranslation('de', de, 'home');
translator.addTranslation('en', en, 'home');

export * from './home-page.element';
