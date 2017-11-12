import { IState } from './root.reducer';

export function routeParamsSelector(state: IState): { [key: string]: string } {
  return state.routes.context.params;
}
