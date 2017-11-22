import { TemplateResult } from 'lit-html';
import { html } from 'lit-html/lib/lit-extended';

import { store } from '../backend/store';
import { createUser } from './backend/users.actions';
import { User } from './backend/user.class';
import { WithTemplate } from '../utils/template.mixin';
import { WithState, IWithStateStatic } from '../utils/store.mixin';

import './user-form.element';
import { IState } from '../backend/root.reducer';
import { userLoadingSelector } from './backend/users.selectors';
import { property } from '../utils/decorators';

export const UserNewPage: IWithStateStatic<IState> = WithState(
  {
    userLoading: userLoadingSelector,
  },
  WithTemplate(HTMLElement)
);

export class UserNewPageElement extends UserNewPage {
  private user: User = new User();
  @property() private userLoading: boolean;

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

      <my-user-form
        userLoading="${this.userLoading}"
        user="${this.user}"
        on-save="${this.save}"
      ></my-user-form>

      <a href="/users" class="btn btn-default">back</a>
    `;
  }
}

customElements.define('my-user-new-page', UserNewPageElement);
