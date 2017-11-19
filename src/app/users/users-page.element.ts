import { TemplateResult } from 'lit-html';
import { html } from 'lit-html/lib/lit-extended';
import { repeat } from 'lit-html/lib/repeat';

import { WithTemplate } from '../utils/template.mixin';
import { IWithStateStatic, WithState } from '../utils/store.mixin';
import { property } from '../utils/decorators';
import { t } from '../translator';

import { fetchUsers, deleteUser } from './backend/users.actions';
import { usersSelector } from './backend/users.selectors';
import { User } from './backend/user.class';
import { IState } from '../backend/root.reducer';

import './user-show.element';
import { setTimeout } from 'timers';

export const UsersPage: IWithStateStatic<IState> = WithState(
  { users: usersSelector },
  WithTemplate(HTMLElement)
);

export class UsersPageElement extends UsersPage {
  @property() private users: User[] = [];

  constructor() {
    super();

    this.delete = this.delete.bind(this);
  }

  public connectedCallback() {
    super.connectedCallback();
    this.dispatch(fetchUsers());
  }

  public render(): TemplateResult {
    return html`
      <h2>${t('users:list_page_title')}</h2>

      <ul class="list-group">
        ${repeat(
          this.users,
          user =>
            html`<my-user-show user="${user}" on-delete="${this
              .delete}"></my-user-show>`
        )}
      </ul>

      <a href="/users/new">Create new User</a>
    `;
  }

  public delete(e: CustomEvent) {
    this.dispatch(deleteUser(e.detail));
  }
}

customElements.define('my-users-page', UsersPageElement);
