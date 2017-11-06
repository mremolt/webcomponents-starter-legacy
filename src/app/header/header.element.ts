import { TemplateResult } from 'lit-html';
import { html } from 'lit-html/lib/lit-extended';

import { WithTemplate } from '../utils/template.mixin';

export class HeaderElement extends WithTemplate(HTMLElement) {
  public render(): TemplateResult {
    return html`
      <div class="row">
        <div class="col-sm">
          <ul class="nav">
            <li class="nav-item">
              <a class="nav-link active" href="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/users">Users</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/foo/marc">Foo</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#">Disabled</a>
            </li>
          </ul>
        </div>
      </div>
    `;
  }
}

customElements.define('my-header', HeaderElement);
