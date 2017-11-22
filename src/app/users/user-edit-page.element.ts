import { TemplateResult } from 'lit-html';
import { html } from 'lit-html/lib/lit-extended';

import { UserDetailPageElement } from './user-detail-page';
import { store } from '../backend/store';
import { updateUser } from './backend/users.actions';

import './user-form.element';

export class UserEditPageElement extends UserDetailPageElement {
  public save(e: CustomEvent) {
    e.preventDefault();
    store.dispatch(updateUser(e.detail));
  }

  public render(): TemplateResult {
    return html`
      <h2>Edit User ${this.user.name}</h2>

      <my-user-form
        userLoading="${this.userLoading}"
        user="${this.user}"
        on-save="${this.save}"
      ></my-user-form>

      <a href="/users/${this.user.id}" class="btn btn-default">back</a>
    `;
  }
}

customElements.define('my-user-edit-page', UserEditPageElement);
