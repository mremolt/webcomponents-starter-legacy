import { TemplateResult } from 'lit-html';
import { html } from 'lit-html/lib/lit-extended';
import { repeat } from 'lit-html/lib/repeat';

import { User } from './backend/user.class';
import { WithTemplate } from '../utils/template.mixin';
import { FormValidator } from '../utils/form-validator.class';
import { property } from '../utils/decorators';

function validateFirstname(input: HTMLInputElement): string | null {
  return input.value === 'Ford' || input.value.length >= 6
    ? null
    : 'invalidFirstName';
}

function validateAero(input: HTMLInputElement): string | null {
  return input.value.endsWith('.aero') ? null : 'invalidAero';
}

export class UserFormElement extends WithTemplate(HTMLElement) {
  @property() private userLoading: boolean;
  // tslint:disable-next-line:variable-name
  private _user: User;

  private formValidator: FormValidator;

  get form(): HTMLFormElement {
    return this.querySelector('form') as HTMLFormElement;
  }

  get user(): User {
    return this._user;
  }
  set user(user: User) {
    this._user = user;
    this.formValidator.formData = this.user.rawData();
    this.updateView();
  }

  constructor() {
    super();

    this.formValidator = new FormValidator({
      firstname: [validateFirstname],
      email: [validateAero],
    });
    this.formValidator.subscribeToErrors(() => {
      this.updateView();
    });
  }

  public save(e: Event) {
    e.preventDefault();
    this.formValidator.validateForm();

    if (this.formValidator.valid) {
      const event = new CustomEvent('save', {
        detail: this.formValidator.formData,
      });
      this.dispatchEvent(event);
    }
  }

  public onViewInit() {
    this.formValidator.form = this.form;
  }

  public renderErrors(key: string): TemplateResult {
    const errors = this.formValidator.getErrors(key);
    return html`${repeat(
      errors,
      error => html`<div class="invalid-feedback">${error}</div>`
    )}`;
  }

  public render(): TemplateResult {
    return html`
      <form novalidate on-input="${(e: any) =>
        this.formValidator.updateForm(e)}" on-submit="${(e: Event) =>
      this.save(e)}">
        <div class="form-group row">
          <label for="inputFirstname" class="col-sm-2 col-form-label">Firstname</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="inputFirstname"
              placeholder="Firstname"
              name="firstname"
              value$="${this.formValidator.formData.firstname}"
              required>

              ${this.renderErrors('firstname')}
          </div>
        </div>

        <div class="form-group row">
          <label for="inputLastname" class="col-sm-2 col-form-label">Lastname</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="inputLastname"
              placeholder="Lastname"
              name="lastname"
              value$="${this.formValidator.formData.lastname}"
              required
              minlength="6">

              ${this.renderErrors('lastname')}
          </div>
        </div>

        <div class="form-group row">
          <label for="inputEmail" class="col-sm-2 col-form-label">E-Mail</label>
          <div class="col-sm-10">
            <input
              type="email"
              class="form-control"
              id="inputEmail"
              placeholder="E-Mail"
              name="email"
              value$="${this.formValidator.formData.email}"
              required>

              ${this.renderErrors('email')}
          </div>
        </div>

        <input type="submit" value="Save" class="btn btn-primary"
          disabled="${this.userLoading}">
      </form>
    `;
  }
}

customElements.define('my-user-form', UserFormElement);
