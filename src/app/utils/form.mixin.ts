import { TemplateResult } from 'lit-html';
import { html } from 'lit-html/lib/lit-extended';
import { repeat } from 'lit-html/lib/repeat';

import { t } from '../translator';

export function WithForm(Base: Constructor<HTMLElement>) {
  return class extends Base {
    public formErrors: { [key: string]: { [key: string]: boolean } };
    public formData: any;

    public constraints: {
      [key: string]: Array<(input: HTMLInputElement) => string | null>;
    } = {};

    public updateView: () => void;

    get form(): HTMLFormElement {
      return this.querySelector('form') as HTMLFormElement;
    }

    get valid(): boolean {
      return this.form.checkValidity();
    }
    get invalid(): boolean {
      return !this.valid;
    }

    public validateForm() {
      Array.from(this.form.elements).forEach((element: any) => {
        this.validate(element);
      });
      this.setValidated();
      this.updateView();
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

      this.formErrors = Object.assign({}, this.formErrors, {
        [input.name]: validity,
      });
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

    public renderErrors(key: string): TemplateResult {
      const errors = this.getErrors(key);
      return html`${repeat(
        errors,
        error => html`<div class="invalid-feedback">${error}</div>`
      )}`;
    }
  };
}
