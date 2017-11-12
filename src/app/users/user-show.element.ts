import { TemplateResult } from 'lit-html';
import { html } from 'lit-html/lib/lit-extended';

import { property } from '../utils/decorators';
import { WithTemplate } from '../utils/template.mixin';
import { User } from './backend/user.class';

export class UserShowElement extends WithTemplate(HTMLElement) {
  @property() public user: User = new User();

  public render(): TemplateResult {
    return html`
      <li class="list-group-item">
        <a href="/users/${this.user.id}">
          ${this.user.firstname}
          ${this.user.lastname}
        </a>
        (${this.user.email})
      </li>
    `;
  }
}

customElements.define('my-user-show', UserShowElement);
