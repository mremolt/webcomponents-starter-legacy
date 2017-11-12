import { TemplateResult } from 'lit-html';
import { html } from 'lit-html/lib/lit-extended';
import { Unsubscribe, Store } from 'redux';

import { WithTemplate } from '../utils/template.mixin';
import { property } from '../utils/decorators';
import { store } from '../backend/store';
import { fetchUser } from './backend/users.actions';
import { userSelector } from './backend/users.selectors';
import { User } from './backend/user.class';
import { routeParamsSelector } from '../backend/routes.selectors';
import { IState } from '../backend/root.reducer';

export class UserDetailPageElement extends WithTemplate(HTMLElement) {
  @property() protected user: User = new User();
  private unsubscribe: Unsubscribe;

  // tslint:disable-next-line:variable-name
  private _userId: string;

  get userId(): string {
    return this._userId;
  }
  set userId(id: string) {
    if (id && id !== this._userId && id !== String(this.user.id)) {
      this._userId = id;
      store.dispatch(fetchUser(id));
    }
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this.stateToProps(store);

    this.unsubscribe = store.subscribe(() => {
      this.stateToProps(store);
    });
  }

  public disconnectedCallback() {
    this.unsubscribe();
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

  protected stateToProps(s: Store<IState>): void {
    const state = s.getState();
    this.user = userSelector(state);
    this.userId = routeParamsSelector(state).id;
  }
}

customElements.define('my-user-detail-page', UserDetailPageElement);
