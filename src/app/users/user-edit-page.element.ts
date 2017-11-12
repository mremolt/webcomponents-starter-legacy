import { Store } from 'redux';
import { TemplateResult } from 'lit-html';
import { html } from 'lit-html/lib/lit-extended';
import * as validate from 'validate.js';

import { IState } from '../backend/root.reducer';
import { routeParamsSelector } from '../backend/routes.selectors';
import { UserDetailPageElement } from './user-detail-page';
import { IUser } from './backend/user.class';
import { userSelector } from './backend/users.selectors';
import { property } from '../utils/decorators';

export class UserEditPageElement extends UserDetailPageElement {
  private formData: IUser = {} as IUser;
  private constraints = {
    firstname: { presence: { allowEmpty: false }, length: { minimum: 6 } },
    lastname: { presence: { allowEmpty: false } },
    email: { presence: { allowEmpty: false }, email: true },
  };
  @property() private formErrors: { [key: string]: string[] } | undefined;

  get form(): HTMLFormElement {
    return this.querySelector('form') as HTMLFormElement;
  }

  get invalid(): boolean {
    return !!this.formErrors;
  }

  public save(e: Event) {
    e.preventDefault();
    console.log('saving', this.formData);
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
      <h2>Edit User ${this.user.name}</h2>

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
        <a href="/users/${this.user.id}" class="btn btn-default">back</a>
      </form>

    `;
  }

  protected stateToProps(s: Store<IState>): void {
    const state = s.getState();
    const user = userSelector(state);
    if (user && user !== this.user) {
      this.user = user;
      this.formData = this.user.rawData();
    }
    this.userId = routeParamsSelector(state).id;
  }

  protected updateForm(e: any) {
    const input = e.target as HTMLInputElement;
    this.formData = Object.assign({}, this.formData, {
      [input.name]: input.value,
    });
    this.formErrors = validate(this.formData, this.constraints);
  }
}

customElements.define('my-user-edit-page', UserEditPageElement);
