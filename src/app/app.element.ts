import { TemplateResult } from 'lit-html';
import { html } from 'lit-html/lib/lit-extended';

import { WithTemplate } from './utils/template.mixin';
import { store } from './backend/store';
import { property } from './utils/decorators';

export class AppElement extends WithTemplate(HTMLElement) {
  @property() private page: HTMLElement;

  public connectedCallback() {
    this.page = document.createElement('div');

    store.subscribe(() => {
      const Element = store.getState().routes.element;
      if (Element && !(this.page.constructor === Element)) {
        this.page = new Element();
      }
    });
  }

  public render(): TemplateResult {
    return html`
      <div class="container">
        <my-header></my-header>
        <div id="content">${this.page}</div>
      </div>
    `;
  }
}

customElements.define('my-app', AppElement);