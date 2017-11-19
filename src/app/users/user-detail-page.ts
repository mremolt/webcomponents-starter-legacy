import { TemplateResult } from 'lit-html';
import { html } from 'lit-html/lib/lit-extended';

import { WithTemplate } from '../utils/template.mixin';
import { property } from '../utils/decorators';
import { fetchUser } from './backend/users.actions';
import { userSelector } from './backend/users.selectors';
import { User } from './backend/user.class';
import { routeParamsSelector } from '../backend/routes.selectors';
import { WithState, IWithStateStatic } from '../utils/store.mixin';
import { IState } from '../backend/root.reducer';

export const UserDetailPage: IWithStateStatic<IState> = WithState(
  {
    user: userSelector,
    userId: (state: IState) => routeParamsSelector(state).id,
  },
  WithTemplate(HTMLElement)
);

export class UserDetailPageElement extends UserDetailPage {
  @property() protected user: User = new User();

  // tslint:disable-next-line:variable-name
  private _userId: string;

  get userId(): string {
    return this._userId;
  }
  set userId(id: string) {
    if (id && id !== this._userId && id !== String(this.user.id)) {
      this._userId = id;
      this.dispatch(fetchUser(id));
    }
  }

  public render(): TemplateResult {
    return html`
      <h2>User ${this.user.name}</h2>

      <ul class="list-group">
        <li class="list-group-item">Name: ${this.user.name}</li>
        <li class="list-group-item">E-Mail: ${this.user.email}</li>
      </ul>

      <a href="/users/${this.user.id}/edit">edit</a>
      <br>
      <a href="/users">back</a>
    `;
  }
}

customElements.define('my-user-detail-page', UserDetailPageElement);
