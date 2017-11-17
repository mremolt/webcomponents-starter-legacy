import { Translator } from './utils/translator.class';

export const translator = new Translator();

export function t(key: string, data?: any) {
  return translator.t(key, data);
}
