import { Middleware } from 'redux';

export default class DevelopmentEnvironment {
  public apiUrl = 'http://jsonplaceholder.typicode.com';
  public throwOnSchemaError = false;
  public pageTitle = 'Web Starter (development)';
  public base = '/';

  public additionalMiddleware: Middleware[] = [];
}
