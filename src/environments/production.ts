import { GenericStoreEnhancer } from 'redux';

export default class ProductionEnvironment {
  public apiUrl = 'https://food-order-api.herokuapp.com';

  public throwOnSchemaError = true;
  public autoUpdate: string = 'confirm';
  public updateMessage = 'Updates available, reload page now?';
  public pageTitle = 'Webcomponents Starter';
  public base = '/';
  public additionalEnhancers: GenericStoreEnhancer[] = [];
}
