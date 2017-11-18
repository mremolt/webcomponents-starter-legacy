webpackJsonp([1],{"./src/app/home/index.ts":function(e,o,t){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var l=t("./src/app/translator.ts"),n=t("./src/app/home/locale/de.json"),s=t.n(n),a=t("./src/app/home/locale/en.json"),r=t.n(a),c=t("./node_modules/lit-html/lib/lit-extended.js"),i=t("./src/app/utils/template.mixin.ts");class h extends(Object(i.a)(HTMLElement)){constructor(){super(...arguments),this.who="World"}render(){return c["a"]`
      <h2>${Object(l.a)("home:title")}</h2>

      <div>${Object(l.a)("home:hello",{who:this.who})}</div>
    `}}customElements.define("my-home-page",h),t.d(o,"HomePageElement",function(){return h}),l.b.addTranslation("de",s.a,"home"),l.b.addTranslation("en",r.a,"home")},"./src/app/home/locale/de.json":function(e,o){e.exports={title:"Startseite",hello:"Hallo {who}"}},"./src/app/home/locale/en.json":function(e,o){e.exports={title:"Home Page",hello:"Hello {who}"}}});
//# sourceMappingURL=1-1.17b84e212fa45800844d.chunk.js.map