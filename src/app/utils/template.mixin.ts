import { TemplateResult } from 'lit-html';
import { html, render } from 'lit-html/lib/lit-extended';

export function WithTemplate(Base: Constructor<HTMLElement>) {
  return class extends Base {
    public needsRender: boolean = true;

    constructor() {
      super();
    }

    public connectedCallback() {
      this.updateView();
    }

    public render(): TemplateResult {
      return html``;
    }

    public async updateView() {
      if (this.needsRender) {
        this.needsRender = false;
        await 0;
        this.needsRender = true;
        render(this.render(), this as HTMLElement);
      }
    }
  };
}
