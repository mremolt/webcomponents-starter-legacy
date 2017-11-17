import { TemplateResult } from 'lit-html';
import { html } from 'lit-html/lib/lit-extended';

import { IUser, User } from './backend/user.class';
import { property } from '../utils/decorators';
import { WithTemplate } from '../utils/template.mixin';
import { WithForm } from '../utils/form.mixin';

function validateFirstname(input: HTMLInputElement): string | null {
  return input.value === 'Ford' || input.value.length >= 6
    ? null
    : 'invalidFirstName';
}

function validateAero(input: HTMLInputElement): string | null {
  return input.value.endsWith('.aero') ? null : 'invalidAero';
}

export class UserFormElement extends WithForm(WithTemplate(HTMLElement)) {
  @property() public formErrors = {};
  public formData: IUser = {} as IUser;

  public constraints: {
    [key: string]: Array<(input: HTMLInputElement) => string | null>;
  } = {
    firstname: [validateFirstname],
    email: [validateAero],
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

  public save(e: Event) {
    e.preventDefault();
    this.validateForm();
    if (this.valid) {
      const event = new CustomEvent('save', { detail: this.formData });
      this.dispatchEvent(event);
    }
  }

  public render(): TemplateResult {
    return html`
      <form novalidate on-input="${(e: any) =>
        this.updateForm(e)}" on-submit="${(e: Event) => this.save(e)}">
        <div class="form-group row">
          <label for="inputFirstname" class="col-sm-2 col-form-label">Firstname</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="inputFirstname"
              placeholder="Firstname"
              name="firstname"
              value$="${this.formData.firstname}"
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
              value$="${this.formData.lastname}"
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
              value$="${this.formData.email}"
              required>

              ${this.renderErrors('email')}
          </div>
        </div>

        <input type="submit" value="Save" class="btn btn-primary"
          disabled="${false}">
      </form>
    `;
  }
}

customElements.define('my-user-form', UserFormElement);
