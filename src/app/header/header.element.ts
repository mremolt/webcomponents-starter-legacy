import { TemplateResult } from 'lit-html';
import { html } from 'lit-html/lib/lit-extended';

import { translator, t } from '../translator';
import { WithTemplate } from '../utils/template.mixin';

export class HeaderElement extends WithTemplate(HTMLElement) {
  public switchLanguage(e: Event, locale: string) {
    e.preventDefault();
    translator.locale = locale;
    this.updateView();
  }

  public render(): TemplateResult {
    return html`
      <div class="row">
        <div class="col">
          <ul class="nav">
            <li class="nav-item">
              <a class="nav-link active" href="/">${t('header:nav_home')}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/users">${t('header:nav_users')}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/foo/marc">${t('header:nav_foo')}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#">${t(
                'header:nav_disabled'
              )}</a>
            </li>

          </ul>
        </div>
      <!-- </div>

      <div class="row"> -->
        <div class="col align-self-end">
          <ul class="nav">

          <li class="nav-item">
              <a class="nav-link" href="#"
                on-click="${(e: Event) => this.switchLanguage(e, 'de')}">
                ${t('header:nav_de')}
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="#"
                on-click="${(e: Event) => this.switchLanguage(e, 'en')}">
                ${t('header:nav_en')}
              </a>
            </li>
          </ul>
        </div>
      </div>
    `;
  }
}

customElements.define('my-header', HeaderElement);
