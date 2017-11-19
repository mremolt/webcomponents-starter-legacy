import equals from 'ramda/src/equals';

import { t } from '../translator';

export type IErrorCallback = (
  errors: { [key: string]: { [key: string]: boolean } }
) => void;

export class FormValidator {
  // tslint:disable-next-line:variable-name
  public _formErrors: { [key: string]: { [key: string]: boolean } } = {};
  public formData: any;

  public form: HTMLFormElement;
  private errorCallbacks: IErrorCallback[] = [];

  get valid(): boolean {
    return this.form && this.form.checkValidity();
  }
  get invalid(): boolean {
    return !this.valid;
  }

  get formErrors(): { [key: string]: { [key: string]: boolean } } {
    return this._formErrors;
  }

  set formErrors(errors: { [key: string]: { [key: string]: boolean } }) {
    this._formErrors = errors;
    this.errorCallbacks.forEach(cb => {
      cb(errors);
    });
  }

  constructor(
    private constraints: {
      [key: string]: Array<(input: HTMLInputElement) => string | null>;
    }
  ) {}

  public validateForm() {
    Array.from(this.form.elements).forEach((element: any) => {
      this.validate(element);
    });
    this.setValidated();
  }

  public setValidated(): void {
    this.form.classList.add('was-validated');
  }

  public validate(input: HTMLInputElement) {
    const errors = (this.constraints[input.name] || [])
      .map((validator: any) => {
        return validator(input);
      })
      .filter(error => error);

    if (errors.length > 0) {
      input.setCustomValidity('invalid');
    } else {
      input.setCustomValidity('');
    }

    let validityMap: { [key: string]: boolean } = {
      badInput: input.validity.badInput,
      patternMismatch: input.validity.patternMismatch,
      rangeOverflow: input.validity.rangeOverflow,
      rangeUnderflow: input.validity.rangeUnderflow,
      stepMismatch: input.validity.stepMismatch,
      tooLong: input.validity.tooLong,
      tooShort: input.validity.tooShort,
      typeMismatch: input.validity.typeMismatch,
      valueMissing: input.validity.valueMissing,
    };

    validityMap = errors.reduce((result, error) => {
      return Object.assign({}, result, { [error]: true });
    }, validityMap);

    const validity = Object.keys(validityMap).reduce((result, key) => {
      if (validityMap[key]) {
        return Object.assign({}, result, { [key]: true });
      }
      return result;
    }, {});

    if (!equals(this.formErrors[input.name], validity)) {
      this.formErrors = Object.assign({}, this.formErrors, {
        [input.name]: validity,
      });
    }
  }

  public updateForm(e: Event) {
    const input = e.target as HTMLInputElement;
    this.formData = Object.assign({}, this.formData, {
      [input.name]: input.value,
    });

    this.validate(input);
  }

  public getErrors(key: string): string[] {
    return Object.keys(this.formErrors[key] || {}).map(error => {
      return t(`errors:${error}`);
    });
  }

  public subscribeToErrors(cb: IErrorCallback) {
    this.errorCallbacks.push(cb);
  }
}
