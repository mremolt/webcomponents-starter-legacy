declare var ENV: string;
declare var TS_VERSION: string;

type Constructor<T = {}> = new (...args: any[]) => T;

interface NodeModule {
  hot: any;
}

interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
}

declare module '*.json' {
  const value: any;
  export default value;
}

declare module 'worker-loader!*' {
  class WebpackWorker extends Worker {
    constructor();
  }

  export = WebpackWorker;
}

declare module 'redux-persist';
declare module 'redux-persist/es/storage';
