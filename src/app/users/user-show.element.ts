import { TemplateResult } from 'lit-html';
import { html } from 'lit-html/lib/lit-extended';

import { property } from '../utils/decorators';
import { WithTemplate } from '../utils/template.mixin';
import { User } from './backend/user.class';

export class UserShowElement extends WithTemplate(HTMLElement) {
  @property() public user: User = new User();

  constructor() {
    super();
    this.delete = this.delete.bind(this);
  }

  public render(): TemplateResult {
    return html`
      <li class="list-group-item">
        <a href="/users/${this.user.id}">
          ${this.user.firstname}
          ${this.user.lastname}
        </a>
        (${this.user.email})
        <button type="button" class="btn btn-danger float-right" on-click="${this
          .delete}">delete</button>
        <div class="clearfix"></div>
      </li>
    `;
  }

  public delete() {
    const event = new CustomEvent('delete', { detail: this.user.id });
    this.dispatchEvent(event);
  }
}

customElements.define('my-user-show', UserShowElement);
