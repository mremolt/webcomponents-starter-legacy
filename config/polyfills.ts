const polyfills: string[] = [
  'core-js/modules/es7.array.includes',
  'core-js/modules/es7.object.entries',
  'core-js/modules/es7.object.values',
];

const ie11 = ['core-js/es6'];

const ie10 = [
  'intl',
  // // add more languages if necessary for project
  'intl/locale-data/jsonp/de-DE',
  'intl/locale-data/jsonp/en-US',

  // if you make use of advanced console commands: console.group (like redux-logger), console.time etc.
  // needed for IE < 11
  'console-polyfill',
];

export const MODERN = polyfills;
export const IE11 = [...ie11, ...polyfills];
export const IE10 = [...ie10, ...ie11, ...polyfills];
