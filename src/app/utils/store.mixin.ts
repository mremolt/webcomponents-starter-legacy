import { Store } from 'redux';
import { Unsubscribe } from 'redux';
import { AnyAction } from 'redux';

import { store } from '../backend/store';

export interface IWithStateInstance<T> {
  store: Store<T>;
  unsubscribe: Unsubscribe;
  dispatch(action: AnyAction): AnyAction;
  stateToProps(s: Store<any>): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
}
export interface IWithStateStatic<T> {
  new (...args: any[]): IWithStateInstance<T>;
}

export function WithState<T extends Constructor<any>, S>(
  propsConfig: any,
  Base: T
): IWithStateStatic<S> & T {
  return class extends Base {
    [key: string]: any;

    public store = store;

    public unsubscribe: Unsubscribe;

    public dispatch(action: AnyAction) {
      return this.store.dispatch(action);
    }

    public connectedCallback(): void {
      this.stateToProps(store);

      this.unsubscribe = store.subscribe(() => {
        this.stateToProps(store);
      });
      super.connectedCallback();
    }

    public disconnectedCallback() {
      this.unsubscribe();
    }

    public stateToProps(s: Store<any>) {
      const state = s.getState();
      Object.keys(propsConfig).forEach(key => {
        this[key] = propsConfig[key](state);
      });
    }
  };
}
