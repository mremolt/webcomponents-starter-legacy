import { TemplateResult } from 'lit-html';
import { html } from 'lit-html/lib/lit-extended';
import { repeat } from 'lit-html/lib/repeat';
import { Unsubscribe } from 'redux';

import { WithTemplate } from '../utils/template.mixin';
import { property } from '../utils/decorators';
import { store } from '../backend/store';

import { fetchUsers, deleteUser } from './backend/users.actions';
import { usersSelector } from './backend/users.selectors';
import { User } from './backend/user.class';

import './user-show.element';
import { t } from 'i18next';

// const shuffleArray = (arr: any[]) => {
//   arr = [...arr];
//   return arr.sort(() => Math.random() - 0.5);
// };

export class UsersPageElement extends WithTemplate(HTMLElement) {
  @property() private users: User[] = [];
  private unsubscribe: Unsubscribe;

  public connectedCallback() {
    super.connectedCallback();

    this.unsubscribe = store.subscribe(() => {
      this.users = usersSelector(store.getState());
      // this.users = [
      //   ...usersSelector(store.getState()),
      //   ...usersSelector(store.getState()),
      //   ...usersSelector(store.getState()),
      //   ...usersSelector(store.getState()),
      //   ...usersSelector(store.getState()),
      //   ...usersSelector(store.getState()),
      //   ...usersSelector(store.getState()),
      //   ...usersSelector(store.getState()),
      //   ...usersSelector(store.getState()),
      //   ...usersSelector(store.getState()),
      // ];

      // setInterval(() => {
      //   this.users = shuffleArray(this.users);
      // }, 150);
    });

    store.dispatch(fetchUsers());
  }

  public disconnectedCallback() {
    this.unsubscribe();
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
    store.dispatch(deleteUser(e.detail));
  }
}

customElements.define('my-users-page', UsersPageElement);
