import { TemplateResult } from 'lit-html';
import { html, render } from 'lit-html/lib/lit-extended';

export function WithTemplate<T extends Constructor<HTMLElement>>(Base: T) {
  return class extends Base {
    public needsRender: boolean = true;
    public viewInitialized: boolean = false;

    public connectedCallback() {
      this.updateView();
    }

    public onViewUpdated(): void {
      return;
    }

    public onViewInit(): void {
      return;
    }

    public render(): TemplateResult {
      return html``;
    }

    public async updateView() {
      if (this.needsRender) {
        this.needsRender = false;
        await 0;
        this.needsRender = true;
        render(this.render(), this);

        if (!this.viewInitialized) {
          this.onViewInit();
        }
        this.viewInitialized = true;
        this.onViewUpdated();
      }
    }
  };
}
