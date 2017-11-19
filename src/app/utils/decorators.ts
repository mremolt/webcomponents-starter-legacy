export function property() {
  return (target: any, key: string) => {
    const result: any = {
      get() {
        return this['_' + key];
      },
      set(value: any) {
        if (this['_' + key] !== value) {
          this['_' + key] = value;
          this.updateView();
        }
      },
    };
    return result;
  };
}
