import compile from 'string-template/compile';

export interface ITranslation {
  [key: string]: string;
}

export interface ITranslations {
  [key: string]: ITranslation;
}

export interface ICompiledTranslations {
  [key: string]: { [key: string]: (data: any) => string };
}

export interface ISettings {
  defaultLocale?: string;
  locale?: string;
  translations?: ITranslations;
}

export class Translator {
  private translations: ICompiledTranslations = {};
  private callbacks: Array<(locale: string) => void> = [];

  get defaultLocale(): string {
    return this.settings.defaultLocale || navigator.language;
  }

  get locale(): string {
    return (
      this.settings.locale ||
      localStorage.getItem('app:currentLocale') ||
      this.defaultLocale
    );
  }
  set locale(locale: string) {
    if (!this.translations[locale]) {
      throw new TypeError(`Locale ${locale} has no translations!`);
    }
    if (this.settings.locale !== locale) {
      this.settings.locale = locale;
      localStorage.setItem('app:currentLocale', locale);

      this.callbacks.forEach(cb => {
        cb(locale);
      });
    }
  }

  constructor(private settings: ISettings = {}) {
    const trans = this.settings.translations || {};

    Object.keys(trans).forEach(key => {
      this.addTranslation(key, trans[key]);
    });
  }

  public addTranslation(
    locale: string,
    translation: ITranslation,
    namespace?: string
  ): void {
    const compiledTranslation = Object.keys(
      translation
    ).reduce((result, key) => {
      const tkey = namespace ? `${namespace}:${key}` : key;
      return Object.assign({}, result, { [tkey]: compile(translation[key]) });
    }, {});

    this.translations[locale] = Object.assign(
      {},
      this.translations[locale],
      compiledTranslation
    );
  }

  public translate(key: string, data?: any): string {
    try {
      return this.translations[this.locale][key](data);
    } catch (e) {
      return `[Translation Missing: ${this.locale} - ${key}]`;
    }
  }

  public t(key: string, data?: any): string {
    return this.translate(key, data);
  }

  public onLocaleChange(cb: (locale: string) => void) {
    this.callbacks.push(cb);
  }
}
