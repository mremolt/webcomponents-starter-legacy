declare var ENV: string;
declare var TS_VERSION: string;

type Constructor<T = {}> = new (...args: any[]) => T;

interface NodeModule {
  hot: any;
}

interface System {
  import(request: string): Promise<any>;
}
var System: System;

interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
}

declare module '*.json' {
  const value: any;
  export default value;
}

declare module 'hyperhtml';
