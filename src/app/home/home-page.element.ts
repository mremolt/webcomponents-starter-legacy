import { TemplateResult } from 'lit-html';
import { html } from 'lit-html/lib/lit-extended';
import { t } from '../translator';

import { WithTemplate } from '../utils/template.mixin';

export class HomePageElement extends WithTemplate(HTMLElement) {
  private who: string = 'World';

  public render(): TemplateResult {
    return html`
      <h2>${t('home:title')}</h2>

      <div>${t('home:hello', { who: this.who })}</div>
    `;
  }
}

customElements.define('my-home-page', HomePageElement);
