import { translator } from '../translator';
import de from './locale/de.json';
import en from './locale/en.json';

translator.addTranslation('de', de, 'header');
translator.addTranslation('en', en, 'header');

export * from './header.element';
