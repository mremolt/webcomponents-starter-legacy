import { TemplateResult } from 'lit-html';
import { html, render } from 'lit-html/lib/lit-extended';

export function WithTemplate(Base: Constructor<HTMLElement>) {
  return class extends Base {
    public connectedCallback() {
      this.updateView();
    }

    public render(): TemplateResult {
      return html``;
    }

    public updateView() {
      // await 0;
      setTimeout(() => {
        render(this.render(), this as HTMLElement);
      });
    }
  };
}
