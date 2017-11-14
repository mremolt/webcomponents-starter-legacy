import { GenericStoreEnhancer } from 'redux';

export default class ProductionEnvironment {
  public apiUrl = 'http://localhost:3001';
  public throwOnSchemaError = true;
  public autoUpdate: string = 'confirm';
  public updateMessage = 'Updates available, reload page now?';
  public pageTitle = 'DCS Angular Starter';
  public base = '/';
  // public additionalEnhancers: GenericStoreEnhancer[] = [persistStateEnhancer()];
  public additionalEnhancers: GenericStoreEnhancer[] = [];
}
