import { translator } from '../translator';
import de from './locale/de.json';
import en from './locale/en.json';

translator.addTranslation('de', de, 'users');
translator.addTranslation('en', en, 'users');

export * from './user-detail-page';
export * from './user-edit-page.element';
export * from './user-form.element';
export * from './user-new-page.element';
export * from './user-show.element';
export * from './users-page.element';
