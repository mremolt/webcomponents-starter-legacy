import { TemplateResult } from 'lit-html';
import { html } from 'lit-html/lib/lit-extended';

import { WithTemplate } from '../utils/template.mixin';
import { property } from '../utils/decorators';
import { store } from '../backend/store';
import { fetchUser } from './backend/users.actions';
import { userSelector } from './backend/users.selectors';
import { User } from './backend/user.class';

export class UserDetailPageElement extends WithTemplate(HTMLElement) {
  @property() private user: User = new User();

  public connectedCallback(): void {
    super.connectedCallback();

    store.subscribe(() => {
      this.user = userSelector(store.getState());
    });

    const route = store.getState().getIn(['routes', 'context']);
    store.dispatch(fetchUser(route.params.id));
  }

  public render(): TemplateResult {
    return html`
      <h2>User ${this.user.name}</h2>

      <ul class="list-group">
        <li class="list-group-item">Name: ${this.user.name}</li>
        <li class="list-group-item">E-Mail: ${this.user.email}</li>
        <li class="list-group-item">Phone: ${this.user.phone}</li>
        <li class="list-group-item">Website: ${this.user.website}</li>
      </ul>

      <a href="/users">back</a>
    `;
  }
}

customElements.define('my-user-detail-page', UserDetailPageElement);
