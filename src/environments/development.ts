import { Middleware } from 'redux';

export default class DevelopmentEnvironment {
  public apiUrl = 'https://food-order-api.herokuapp.com';
  public throwOnSchemaError = false;
  public pageTitle = 'Webcomponents Starter (development)';
  public base = '/';

  public additionalMiddleware: Middleware[] = [];
}
