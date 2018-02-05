export class FooBarElement extends HTMLElement {
  public connectedCallback() {
    this.innerHTML = '<span>FOO BAR BAZ!</span>';
  }
}

customElements.define('my-foo-bar', FooBarElement);
