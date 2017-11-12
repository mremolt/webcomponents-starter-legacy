export class Model<T> {
  [key: string]: any;

  constructor(params: Partial<T> = {}) {
    const keys = Object.keys(params) as Array<keyof T>;
    keys.map(key => {
      this[key] = params[key];
    });
    Object.freeze(this);
  }

  public clone(): Model<T> {
    return new (this.constructor as Constructor<Model<T>>)(this.rawData);
  }

  public merge(params: Partial<T>): Model<T> {
    const data = Object.assign({}, this.rawData(), params);
    return new (this.constructor as Constructor<Model<T>>)(data);
  }

  public rawData(): T {
    return Object.getOwnPropertyNames(this).reduce((obj: any, key: string) => {
      obj[key] = this[key];
      return obj;
    }, {});
  }
}
