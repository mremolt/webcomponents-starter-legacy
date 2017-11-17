import { translator } from '../translator';

import de from './de.json';
import en from './en.json';
import errorsDe from './errors.de.json';
import errorsEn from './errors.en.json';

translator.addTranslation('de', de);
translator.addTranslation('en', en);
translator.addTranslation('de', errorsDe, 'errors');
translator.addTranslation('en', errorsEn, 'errors');
