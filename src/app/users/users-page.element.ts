import { TemplateResult } from 'lit-html';
import { html } from 'lit-html/lib/lit-extended';
import { List } from 'immutable';

import { WithTemplate } from '../utils/template.mixin';
import { store } from '../backend/store';
import { fetchUsers } from './backend/users.actions';
import { property } from '../utils/decorators';
import { usersSelector } from './backend/users.selectors';
import { User } from './backend/user.class';

export class UsersPageElement extends WithTemplate(HTMLElement) {
  @property() private users: List<User> = List();

  public connectedCallback() {
    super.connectedCallback();

    store.subscribe(() => {
      this.users = usersSelector(store.getState());
    });

    store.dispatch(fetchUsers());
  }

  public render(): TemplateResult {
    return html`
      <h2>Users Page</h2>

      <ul class="list-group">
        ${this.users.map(
          user => html`<my-user-show user="${user}"></my-user-show>`
        )}
      </ul>
    `;
  }
}

customElements.define('my-users-page', UsersPageElement);
