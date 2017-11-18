webpackJsonp([0],{"./node_modules/reselect/lib/index.js":function(e,t,s){"use strict";function r(e,t){return e===t}function n(e,t,s){if(null===t||null===s||t.length!==s.length)return!1;for(var r=t.length,n=0;n<r;n++)if(!e(t[n],s[n]))return!1;return!0}function a(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:r,s=null,a=null;return function(){return n(t,s,arguments)||(a=e.apply(null,arguments)),s=arguments,a}}function i(e){var t=Array.isArray(e[0])?e[0]:e;if(!t.every(function(e){return"function"==typeof e})){var s=t.map(function(e){return typeof e}).join(", ");throw new Error("Selector creators expect all input-selectors to be functions, instead received the following types: ["+s+"]")}return t}function o(e){for(var t=arguments.length,s=Array(t>1?t-1:0),r=1;r<t;r++)s[r-1]=arguments[r];return function(){for(var t=arguments.length,r=Array(t),n=0;n<t;n++)r[n]=arguments[n];var o=0,l=r.pop(),c=i(r),u=e.apply(void 0,[function(){return o++,l.apply(null,arguments)}].concat(s)),d=a(function(){for(var e=[],t=c.length,s=0;s<t;s++)e.push(c[s].apply(null,arguments));return u.apply(null,e)});return d.resultFunc=l,d.recomputations=function(){return o},d.resetRecomputations=function(){return o=0},d}}t.__esModule=!0,t.defaultMemoize=a,t.createSelectorCreator=o,t.createStructuredSelector=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:l;if("object"!=typeof e)throw new Error("createStructuredSelector expects first argument to be an object where each property is a selector, instead received a "+typeof e);var s=Object.keys(e);return t(s.map(function(t){return e[t]}),function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return t.reduce(function(e,t,r){return e[s[r]]=t,e},{})})};var l=t.createSelector=o(a)},"./src/app/users/index.ts":function(e,t,s){"use strict";function r(e,t,s){let r;return 2===arguments.length?s=t:3===arguments.length&&(r=t),Object(x.d)(t=>{let n=N.get(t);void 0===n&&(n={keyMap:r&&new Map,parts:[]},N.set(t,n));const a=t.startNode.parentNode,i=n.parts,o=new Map(i.map(e=>[e.endNode,e])),l=n.keyMap,c=[];let u,d=0;for(const n of e){let e,m;try{e=s(n,d++),m=r&&r(n)}catch(e){console.error(e);continue}let h=void 0===l?i[0]:l.get(m);if(void 0===h){void 0===u&&(u=new Text,a.insertBefore(u,t.startNode.nextSibling));const e=new Text;a.insertBefore(e,u.nextSibling),h=new x.b(t.instance,u,e),void 0!==m&&void 0!==l&&l.set(m,h)}else{const e=document.createRange();if(e.setStartBefore(h.startNode),e.setEndBefore(h.endNode),void 0===u){if(t.startNode.nextSibling!==h.startNode){const s=o.get(h.startNode);s&&(s.endNode=h.endNode,o.set(s.endNode,s));const r=e.extractContents();t.startNode.nextSibling===t.endNode?(h.endNode=new Text,a.insertBefore(h.endNode,t.startNode.nextSibling)):h.endNode=t.startNode.nextSibling,a.insertBefore(r,t.startNode.nextSibling)}}else if(u!==h.startNode){const t=o.get(h.startNode);t&&(t.endNode=h.endNode,o.set(t.endNode,t));const s=e.extractContents();a.insertBefore(s,u)}i.splice(i.indexOf(h),1)}h.setValue(e),c.push(h),u=h.endNode}if(i.length>0){const e=i[0].startNode,t=i[i.length-1].endNode,s=document.createRange();0===c.length?s.setStartBefore(e):s.setStartAfter(e),s.setEndAfter(t),s.deleteContents(),s.detach()}n.parts=c})}function n(e){return class extends e{constructor(){super(...arguments),this.constraints={}}get form(){return this.querySelector("form")}get valid(){return this.form.checkValidity()}get invalid(){return!this.valid}validateForm(){Array.from(this.form.elements).forEach(e=>{this.validate(e)}),this.setValidated(),this.updateView()}setValidated(){this.form.classList.add("was-validated")}validate(e){const t=(this.constraints[e.name]||[]).map(t=>t(e)).filter(e=>e);t.length>0?e.setCustomValidity("invalid"):e.setCustomValidity("");let s={badInput:e.validity.badInput,patternMismatch:e.validity.patternMismatch,rangeOverflow:e.validity.rangeOverflow,rangeUnderflow:e.validity.rangeUnderflow,stepMismatch:e.validity.stepMismatch,tooLong:e.validity.tooLong,tooShort:e.validity.tooShort,typeMismatch:e.validity.typeMismatch,valueMissing:e.validity.valueMissing};s=t.reduce((e,t)=>Object.assign({},e,{[t]:!0}),s);const r=Object.keys(s).reduce((e,t)=>s[t]?Object.assign({},e,{[t]:!0}):e,{});this.formErrors=Object.assign({},this.formErrors,{[e.name]:r})}updateForm(e){const t=e.target;this.formData=Object.assign({},this.formData,{[t.name]:t.value}),this.validate(t)}getErrors(e){return Object.keys(this.formErrors[e]||{}).map(e=>Object(o.a)(`errors:${e}`))}renderErrors(e){return h["a"]`${r(this.getErrors(e),e=>h["a"]`<div class="invalid-feedback">${e}</div>`)}`}}}function a(e){return"Ford"===e.value||e.value.length>=6?null:"invalidFirstName"}function i(e){return e.value.endsWith(".aero")?null:"invalidAero"}Object.defineProperty(t,"__esModule",{value:!0});var o=s("./src/app/translator.ts"),l=s("./src/app/users/locale/de.json"),c=s.n(l),u=s("./src/app/users/locale/en.json"),d=s.n(u),m=s("./node_modules/tslib/tslib.es6.js"),h=s("./node_modules/lit-html/lib/lit-extended.js"),p=s("./src/app/utils/template.mixin.ts"),f=s("./src/app/utils/decorators.ts"),b=s("./src/app/backend/store.ts"),v=s("./src/app/users/backend/users.actions.ts"),g=s("./node_modules/reselect/lib/index.js");class y{constructor(e={}){Object.keys(e).map(t=>{this[t]=e[t]}),Object.freeze(this)}clone(){return new this.constructor(this.rawData)}merge(e){const t=Object.assign({},this.rawData(),e);return new this.constructor(t)}rawData(){return Object.getOwnPropertyNames(this).reduce((e,t)=>(e[t]=this[t],e),{})}}class w extends y{get name(){return`${this.firstname} ${this.lastname}`}constructor(e){e||(e={id:0,firstname:"",lastname:"",email:""}),super(e)}}const j=Object(g.createSelector)([function(e){return e.users.entities}],e=>e.map(e=>new w(e))),E=Object(g.createSelector)([function(e){return e.currentUser.entity}],e=>new w(e));var O=s("./src/app/backend/routes.selectors.ts");class $ extends(Object(p.a)(HTMLElement)){constructor(){super(...arguments),this.user=new w}get userId(){return this._userId}set userId(e){e&&e!==this._userId&&e!==String(this.user.id)&&(this._userId=e,b.a.dispatch(Object(v.c)(e)))}connectedCallback(){super.connectedCallback(),this.stateToProps(b.a),this.unsubscribe=b.a.subscribe(()=>{this.stateToProps(b.a)})}disconnectedCallback(){this.unsubscribe()}render(){return h["a"]`
      <h2>User ${this.user.name}</h2>

      <ul class="list-group">
        <li class="list-group-item">Name: ${this.user.name}</li>
        <li class="list-group-item">E-Mail: ${this.user.email}</li>
      </ul>

      <a href="/users/${this.user.id}/edit">edit</a>
      <br>
      <a href="/users">back</a>
    `}stateToProps(e){const t=e.getState();this.user=E(t),this.userId=Object(O.a)(t).id}}m.a([Object(f.a)(),m.b("design:type",w)],$.prototype,"user",void 0),customElements.define("my-user-detail-page",$);var x=s("./node_modules/lit-html/lit-html.js");/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const N=new WeakMap;class S extends(n(Object(p.a)(HTMLElement))){constructor(){super(...arguments),this.formErrors={},this.formData={},this.constraints={firstname:[a],email:[i]}}get user(){return this._user}set user(e){this._user=e,this.formData=this.user.rawData(),this.updateView()}save(e){if(e.preventDefault(),this.validateForm(),this.valid){const e=new CustomEvent("save",{detail:this.formData});this.dispatchEvent(e)}}render(){return h["a"]`
      <form novalidate on-input="${e=>this.updateForm(e)}" on-submit="${e=>this.save(e)}">
        <div class="form-group row">
          <label for="inputFirstname" class="col-sm-2 col-form-label">Firstname</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="inputFirstname"
              placeholder="Firstname"
              name="firstname"
              value$="${this.formData.firstname}"
              required>

              ${this.renderErrors("firstname")}
          </div>
        </div>

        <div class="form-group row">
          <label for="inputLastname" class="col-sm-2 col-form-label">Lastname</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="inputLastname"
              placeholder="Lastname"
              name="lastname"
              value$="${this.formData.lastname}"
              required
              minlength="6">

              ${this.renderErrors("lastname")}
          </div>
        </div>

        <div class="form-group row">
          <label for="inputEmail" class="col-sm-2 col-form-label">E-Mail</label>
          <div class="col-sm-10">
            <input
              type="email"
              class="form-control"
              id="inputEmail"
              placeholder="E-Mail"
              name="email"
              value$="${this.formData.email}"
              required>

              ${this.renderErrors("email")}
          </div>
        </div>

        <input type="submit" value="Save" class="btn btn-primary"
          disabled="${!1}">
      </form>
    `}}m.a([Object(f.a)(),m.b("design:type",Object)],S.prototype,"formErrors",void 0),customElements.define("my-user-form",S);class k extends ${save(e){e.preventDefault(),b.a.dispatch(Object(v.e)(e.detail))}render(){return h["a"]`
      <h2>Edit User ${this.user.name}</h2>

      <my-user-form user="${this.user}" on-save="${this.save}"></my-user-form>

      <a href="/users/${this.user.id}" class="btn btn-default">back</a>
    `}}customElements.define("my-user-edit-page",k);class M extends(Object(p.a)(HTMLElement)){constructor(){super(...arguments),this.user=new w}connectedCallback(){super.connectedCallback()}save(e){e.preventDefault(),b.a.dispatch(Object(v.a)(e.detail))}render(){return h["a"]`
      <h2>Add new User</h2>

      <my-user-form user="${this.user}" on-save="${this.save}"></my-user-form>

      <a href="/users/${this.user.id}" class="btn btn-default">back</a>
    `}}customElements.define("my-user-new-page",M);class _ extends(Object(p.a)(HTMLElement)){constructor(){super(),this.user=new w,this.delete=this.delete.bind(this)}render(){return h["a"]`
      <li class="list-group-item">
        <a href="/users/${this.user.id}">
          ${this.user.firstname}
          ${this.user.lastname}
        </a>
        (${this.user.email})
        <button type="button" class="btn btn-danger float-right" on-click="${this.delete}">delete</button>
        <div class="clearfix"></div>
      </li>
    `}delete(){const e=new CustomEvent("delete",{detail:this.user.id});this.dispatchEvent(e)}}m.a([Object(f.a)(),m.b("design:type",w)],_.prototype,"user",void 0),customElements.define("my-user-show",_);class C extends(Object(p.a)(HTMLElement)){constructor(){super(...arguments),this.users=[]}connectedCallback(){super.connectedCallback(),this.unsubscribe=b.a.subscribe(()=>{this.users=j(b.a.getState())}),b.a.dispatch(Object(v.d)())}disconnectedCallback(){this.unsubscribe()}render(){return h["a"]`
      <h2>${Object(o.a)("users:list_page_title")}</h2>

      <ul class="list-group">
        ${r(this.users,e=>h["a"]`<my-user-show user="${e}" on-delete="${this.delete}"></my-user-show>`)}
      </ul>

      <a href="/users/new">Create new User</a>
    `}delete(e){b.a.dispatch(Object(v.b)(e.detail))}}m.a([Object(f.a)(),m.b("design:type",Array)],C.prototype,"users",void 0),customElements.define("my-users-page",C),s.d(t,"UserDetailPageElement",function(){return $}),s.d(t,"UserEditPageElement",function(){return k}),s.d(t,"UserFormElement",function(){return S}),s.d(t,"UserNewPageElement",function(){return M}),s.d(t,"UserShowElement",function(){return _}),s.d(t,"UsersPageElement",function(){return C}),o.b.addTranslation("de",c.a,"users"),o.b.addTranslation("en",d.a,"users")},"./src/app/users/locale/de.json":function(e,t){e.exports={list_page_title:"Zeige Benutzer"}},"./src/app/users/locale/en.json":function(e,t){e.exports={list_page_title:"Show Users"}}});
//# sourceMappingURL=0-0.b0846a78e3e0f8a3676b.chunk.js.map