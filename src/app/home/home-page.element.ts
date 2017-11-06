import { TemplateResult } from 'lit-html';
import { html } from 'lit-html/lib/lit-extended';

import { WithTemplate } from '../utils/template.mixin';

export class HomePageElement extends WithTemplate(HTMLElement) {
  private who: string = 'World';

  public render(): TemplateResult {
    return html`
      <h2>Home Page</h2>

      <div>Hello ${this.who}</div>
    `;
  }
}

customElements.define('my-home-page', HomePageElement);
