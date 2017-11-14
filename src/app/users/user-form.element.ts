import { TemplateResult } from 'lit-html';
import { html } from 'lit-html/lib/lit-extended';
import * as validate from 'validate.js';

import { IUser, User } from './backend/user.class';
import { property } from '../utils/decorators';
import { WithTemplate } from '../utils/template.mixin';

export class UserFormElement extends WithTemplate(HTMLElement) {
  @property() private formErrors: { [key: string]: string[] | null } = {};
  private formData: IUser = {} as IUser;
  private constraints = {
    firstname: { presence: { allowEmpty: false }, length: { minimum: 6 } },
    lastname: { presence: { allowEmpty: false } },
    email: { presence: { allowEmpty: false }, email: true },
  };

  // tslint:disable-next-line:variable-name
  private _user: User;

  get user(): User {
    return this._user;
  }
  set user(user: User) {
    this._user = user;
    this.formData = this.user.rawData();
    this.updateView();
  }

  get form(): HTMLFormElement {
    return this.querySelector('form') as HTMLFormElement;
  }

  get invalid(): boolean {
    return !!validate(this.formData, this.constraints);
  }

  public save(e: Event) {
    e.preventDefault();
    const event = new CustomEvent('save', { detail: this.formData });
    this.dispatchEvent(event);
  }

  public hasErrors(key: string): boolean {
    return !!(this.formErrors && this.formErrors[key]);
  }

  public getErrors(key: string): string[] {
    return (this.formErrors && this.formErrors[key]) || [];
  }

  public renderError(error: string): TemplateResult {
    return html`<div class="invalid-feedback">${error}</div>`;
  }

  public renderErrorClass(key: string): string {
    return this.hasErrors(key)
      ? 'form-control is-invalid'
      : 'form-control is-valid';
  }

  public render(): TemplateResult {
    return html`
      <form novalidate on-change="${(e: any) =>
        this.updateForm(e)}" on-submit="${(e: Event) => this.save(e)}">
        <div class="form-group row">
          <label for="inputFirstname" class="col-sm-2 col-form-label">Firstname</label>
          <div class="col-sm-10">
            <input
              type="text"
              class$="${this.renderErrorClass('firstname')}"
              id="inputFirstname"
              placeholder="Firstname"
              name="firstname"
              value$="${this.formData.firstname}">

            ${this.getErrors('firstname').map(this.renderError)}
          </div>
        </div>

        <div class="form-group row">
          <label for="inputLastname" class="col-sm-2 col-form-label">Lastname</label>
          <div class="col-sm-10">
            <input
              type="text"
              class$="${this.renderErrorClass('lastname')}"
              id="inputLastname"
              placeholder="Lastname"
              name="lastname"
              value$="${this.formData.lastname}">

            ${this.getErrors('lastname').map(this.renderError)}
          </div>

        </div>

        <div class="form-group row">
          <label for="inputEmail" class="col-sm-2 col-form-label">E-Mail</label>
          <div class="col-sm-10">
            <input
              type="text"
              class$="${this.renderErrorClass('email')}"
              id="inputEmail"
              placeholder="E-Mail"
              name="email"
              value$="${this.formData.email}">

            ${this.getErrors('email').map(this.renderError)}
          </div>
        </div>

        <input type="submit" value="Save" class="btn btn-primary"
          disabled="${this.invalid}">
      </form>

    `;
  }

  protected updateForm(e: any) {
    const input = e.target as HTMLInputElement;
    this.formData = Object.assign({}, this.formData, {
      [input.name]: input.value,
    });
    const formErrors = validate(this.formData, this.constraints);

    if (!formErrors) {
      this.formErrors = {};
    } else if (formErrors[input.name]) {
      this.formErrors = {
        ...this.formErrors,
        [input.name]: formErrors[input.name],
      };
    } else {
      this.formErrors = {
        ...this.formErrors,
        [input.name]: null,
      };
    }
  }
}

customElements.define('my-user-form', UserFormElement);
