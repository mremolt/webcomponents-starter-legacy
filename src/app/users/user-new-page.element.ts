import { TemplateResult } from 'lit-html';
import { html } from 'lit-html/lib/lit-extended';

import { store } from '../backend/store';
import { createUser } from './backend/users.actions';
import { WithTemplate } from '../utils/template.mixin';
import { User } from './backend/user.class';

import './user-form.element';

export class UserNewPageElement extends WithTemplate(HTMLElement) {
  private user: User = new User();

  public connectedCallback(): void {
    super.connectedCallback();
  }

  public save(e: CustomEvent) {
    e.preventDefault();
    store.dispatch(createUser(e.detail));
  }

  public render(): TemplateResult {
    return html`
      <h2>Add new User</h2>

      <my-user-form user="${this.user}" on-save="${this.save}"></my-user-form>

      <a href="/users/${this.user.id}" class="btn btn-default">back</a>
    `;
  }
}

customElements.define('my-user-new-page', UserNewPageElement);
