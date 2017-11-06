import { WithTemplate } from '../utils/template.mixin';
import { TemplateResult } from 'lit-html';
import { html } from 'lit-html/lib/lit-extended';
export class FooBarElement extends WithTemplate(HTMLElement) {
  public render(): TemplateResult {
    return html`<span>FOO BAR BAZ!!!</span>`;
  }
}

customElements.define('my-foo-bar', FooBarElement);
