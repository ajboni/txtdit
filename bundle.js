var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function r(t){return"function"==typeof t}function c(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function a(t,e,n,o){return t[1]&&o?function(t,e){for(const n in e)t[n]=e[n];return t}(n.ctx.slice(),t[1](o(e))):n.ctx}function l(t,e){t.appendChild(e)}function i(t,e,n){t.insertBefore(e,n||null)}function s(t){t.parentNode.removeChild(t)}function u(t){return document.createElement(t)}function f(t){return document.createTextNode(t)}function d(){return f(" ")}function m(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function $(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function p(t,e){(null!=e||t.value)&&(t.value=e)}function g(t,e,n,o){t.style.setProperty(e,n,o?"important":"")}function h(t,e){for(let n=0;n<t.options.length;n+=1){const o=t.options[n];if(o.__value===e)return void(o.selected=!0)}}let v;function y(t){v=t}function w(t){(function(){if(!v)throw new Error("Function called outside component initialization");return v})().$$.on_mount.push(t)}const x=[],b=[],_=[],E=[],k=Promise.resolve();let S=!1;function I(t){_.push(t)}const L=new Set;function N(){do{for(;x.length;){const t=x.shift();y(t),j(t.$$)}for(;b.length;)b.pop()();for(let t=0;t<_.length;t+=1){const e=_[t];L.has(e)||(L.add(e),e())}_.length=0}while(x.length);for(;E.length;)E.pop()();S=!1,L.clear()}function j(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(I)}}const A=new Set;function C(t,e){t&&t.i&&(A.delete(t),t.i(e))}function R(t,e,n,o){if(t&&t.o){if(A.has(t))return;A.add(t),(void 0).c.push(()=>{A.delete(t),o&&(n&&t.d(1),o())}),t.o(e)}}function B(t){t&&t.c()}function F(t,n,c){const{fragment:a,on_mount:l,on_destroy:i,after_update:s}=t.$$;a&&a.m(n,c),I(()=>{const n=l.map(e).filter(r);i?i.push(...n):o(n),t.$$.on_mount=[]}),s.forEach(I)}function O(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function T(t,e){-1===t.$$.dirty[0]&&(x.push(t),S||(S=!0,k.then(N)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function U(e,r,c,a,l,i,s=[-1]){const u=v;y(e);const f=r.props||{},d=e.$$={fragment:null,ctx:null,props:i,update:t,not_equal:l,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:n(),dirty:s};let m=!1;d.ctx=c?c(e,f,(t,n,...o)=>{const r=o.length?o[0]:n;return d.ctx&&l(d.ctx[t],d.ctx[t]=r)&&(d.bound[t]&&d.bound[t](r),m&&T(e,t)),n}):[],d.update(),m=!0,o(d.before_update),d.fragment=!!a&&a(d.ctx),r.target&&(r.hydrate?d.fragment&&d.fragment.l(function(t){return Array.from(t.childNodes)}(r.target)):d.fragment&&d.fragment.c(),r.intro&&C(e.$$.fragment),F(e,r.target,r.anchor),N()),y(u)}class q{$destroy(){O(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}}function D(t){let e,n,o,r,c,p,h,v;const y=t[5].default,w=function(t,e,n,o){if(t){const r=a(t,e,n,o);return t[0](r)}}(y,t,t[4],null);return{c(){e=u("div"),n=u("i"),o=d(),r=u("span"),c=f(t[0]),p=d(),w&&w.c(),$(n,"class",t[3]),g(r,"padding","0px 0px 0px 5px"),g(r,"top","auto"),g(r,"bottom","auto"),$(e,"class",t[2])},m(a,s){i(a,e,s),l(e,n),l(e,o),l(e,r),l(r,c),l(e,p),w&&w.m(e,null),h=!0,v=m(e,"click",t[1])},p(t,[o]){(!h||8&o)&&$(n,"class",t[3]),(!h||1&o)&&function(t,e){e=""+e,t.data!==e&&(t.data=e)}(c,t[0]),w&&w.p&&16&o&&w.p(a(y,t,t[4],null),function(t,e,n,o){if(t[2]&&o){const r=t[2](o(n));if("object"==typeof e.dirty){const t=[],n=Math.max(e.dirty.length,r.length);for(let o=0;o<n;o+=1)t[o]=e.dirty[o]|r[o];return t}return e.dirty|r}return e.dirty}(y,t[4],o,null)),(!h||4&o)&&$(e,"class",t[2])},i(t){h||(C(w,t),h=!0)},o(t){R(w,t),h=!1},d(t){t&&s(e),w&&w.d(t),v()}}}function P(t,e,n){let{caption:o}=e,{callback:r=null}=e,{className:c="footer-item"}=e,{icon:a}=e,{$$slots:l={},$$scope:i}=e;return t.$set=t=>{"caption"in t&&n(0,o=t.caption),"callback"in t&&n(1,r=t.callback),"className"in t&&n(2,c=t.className),"icon"in t&&n(3,a=t.icon),"$$scope"in t&&n(4,i=t.$$scope)},[o,r,c,a,i,l]}class M extends q{constructor(t){super(),U(this,t,P,D,c,{caption:0,callback:1,className:2,icon:3})}}function z(e){let n;const o=new M({props:{callback:G,caption:"Clear",icon:"fa fa-eraser"}});return{c(){B(o.$$.fragment)},m(t,e){F(o,t,e),n=!0},p:t,i(t){n||(C(o.$$.fragment,t),n=!0)},o(t){R(o.$$.fragment,t),n=!1},d(t){O(o,t)}}}function G(){window.confirm("Delete all content from the editor?")&&(localStorage.removeItem("content"),sessionStorage.removeItem("documentName"),location.reload())}class H extends q{constructor(t){super(),U(this,t,null,z,c,{})}}function J(e){let n;const o=new M({props:{callback:K,caption:"Export",icon:"fa fa-download"}});return{c(){B(o.$$.fragment)},m(t,e){F(o,t,e),n=!0},p:t,i(t){n||(C(o.$$.fragment,t),n=!0)},o(t){R(o.$$.fragment,t),n=!1},d(t){O(o,t)}}}function K(){const t=localStorage.getItem("content");if(!t)return;let e=sessionStorage.getItem("documentName");e||(e=t.slice(0,10));var n=window.document.createElement("a");n.href=window.URL.createObjectURL(new Blob([t],{type:"text/plain"})),n.download=e,document.body.appendChild(n),n.click(),document.body.removeChild(n)}class Q extends q{constructor(t){super(),U(this,t,null,J,c,{})}}function V(e){let n,o;return{c(){n=u("input"),$(n,"id","file-input"),$(n,"type","file"),$(n,"name","name"),g(n,"display","none")},m(t,r){i(t,n,r),o=m(n,"change",e[1])},p:t,d(t){t&&s(n),o()}}}function W(t){let e;const n=new M({props:{callback:t[0],caption:"Open",icon:"fa fa-upload",$$slots:{default:[V]},$$scope:{ctx:t}}});return{c(){B(n.$$.fragment)},m(t,o){F(n,t,o),e=!0},p(t,[e]){const o={};4&e&&(o.$$scope={dirty:e,ctx:t}),n.$set(o)},i(t){e||(C(n.$$.fragment,t),e=!0)},o(t){R(n.$$.fragment,t),e=!1},d(t){O(n,t)}}}function X(t){return[()=>{document.getElementById("file-input").click()},t=>function(t){const e=t.target.files[0],n=new FileReader;n.addEventListener("load",()=>{localStorage.setItem("content",event.target.result),sessionStorage.setItem("documentName",e.name),location.reload()}),n.readAsText(e)}(t)]}class Y extends q{constructor(t){super(),U(this,t,X,W,c,{})}}function Z(e){let n;const o=new M({props:{caption:"",icon:"fa fa-compress-arrows-alt",callback:tt}});return{c(){B(o.$$.fragment)},m(t,e){F(o,t,e),n=!0},p:t,i(t){n||(C(o.$$.fragment,t),n=!0)},o(t){R(o.$$.fragment,t),n=!1},d(t){O(o,t)}}}function tt(){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()}class et extends q{constructor(t){super(),U(this,t,null,Z,c,{})}}const nt=["default","oasis","oldschool","saturday","simple","sunday","narrow","vscode","vault76"];function ot(t,e,n){const o=t.slice();return o[2]=e[n],o}function rt(e){let n,o,r,c=e[2]+"";return{c(){n=u("option"),o=f(c),n.__value=r=e[2],n.value=n.__value},m(t,e){i(t,n,e),l(n,o)},p:t,d(t){t&&s(n)}}}function ct(t){let e,n,r=nt,c=[];for(let e=0;e<r.length;e+=1)c[e]=rt(ot(t,r,e));return{c(){e=u("select");for(let t=0;t<c.length;t+=1)c[t].c();$(e,"id","themeSelector"),g(e,"cursor","pointer"),void 0===t[0]&&I(()=>t[1].call(e))},m(o,r){i(o,e,r);for(let t=0;t<c.length;t+=1)c[t].m(e,null);h(e,t[0]),n=[m(e,"change",t[1]),m(e,"change",lt)]},p(t,n){if(0&n){let o;for(r=nt,o=0;o<r.length;o+=1){const a=ot(t,r,o);c[o]?c[o].p(a,n):(c[o]=rt(a),c[o].c(),c[o].m(e,null))}for(;o<c.length;o+=1)c[o].d(1);c.length=r.length}1&n&&h(e,t[0])},d(t){t&&s(e),function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(c,t),o(n)}}}function at(t){let e;const n=new M({props:{caption:"",icon:"fa fa-palette",$$slots:{default:[ct]},$$scope:{ctx:t}}});return{c(){B(n.$$.fragment)},m(t,o){F(n,t,o),e=!0},p(t,[e]){const o={};33&e&&(o.$$scope={dirty:e,ctx:t}),n.$set(o)},i(t){e||(C(n.$$.fragment,t),e=!0)},o(t){R(n.$$.fragment,t),e=!1},d(t){O(n,t)}}}function lt(t){const e=t.target.value;localStorage.setItem("theme",e),console.log(t.target.value),location.reload()}function it(t,e,n){let o=localStorage.getItem("theme");return[o,function(){o=function(t){const e=t.querySelector(":checked")||t.options[0];return e&&e.__value}(this),n(0,o)}]}class st extends q{constructor(t){super(),U(this,t,it,at,c,{})}}var ut="1.0.2",ft={type:"git",url:"git://github.com/ajboni/txtdit.git",repo_url:"https://github.com/ajboni/txtdit"};function dt(e){let n,o,r,c,a,f,m,p,g;const h=new st({}),v=new M({props:{caption:ut,icon:"fab fa-github",callback:e[0]}}),y=new H({}),w=new Y({}),x=new Q({}),b=new et({});return{c(){n=u("div"),B(h.$$.fragment),o=d(),r=u("div"),B(v.$$.fragment),c=d(),a=u("div"),B(y.$$.fragment),f=d(),B(w.$$.fragment),m=d(),B(x.$$.fragment),p=d(),B(b.$$.fragment),$(n,"class","footer-item-container"),$(r,"class","footer-middle"),$(a,"class","footer-item-container")},m(t,e){i(t,n,e),F(h,n,null),i(t,o,e),i(t,r,e),F(v,r,null),i(t,c,e),i(t,a,e),F(y,a,null),l(a,f),F(w,a,null),l(a,m),F(x,a,null),l(a,p),F(b,a,null),g=!0},p:t,i(t){g||(C(h.$$.fragment,t),C(v.$$.fragment,t),C(y.$$.fragment,t),C(w.$$.fragment,t),C(x.$$.fragment,t),C(b.$$.fragment,t),g=!0)},o(t){R(h.$$.fragment,t),R(v.$$.fragment,t),R(y.$$.fragment,t),R(w.$$.fragment,t),R(x.$$.fragment,t),R(b.$$.fragment,t),g=!1},d(t){t&&s(n),O(h),t&&s(o),t&&s(r),O(v),t&&s(c),t&&s(a),O(y),O(w),O(x),O(b)}}}function mt(t){return[()=>window.open(ft.repo_url,"_blank")]}class $t extends q{constructor(t){super(),U(this,t,mt,dt,c,{})}}function pt(t){return w(()=>{let t=document.getElementById("main");function e(t){t.preventDefault(),t.stopPropagation()}function n(e){t.classList.add("highlight")}function o(e){t.classList.remove("highlight")}function r(t){localStorage.setItem("content",t.target.result),location.reload()}["dragenter","dragover","dragleave","drop"].forEach(n=>{t.addEventListener(n,e,!1)}),["dragenter","dragover"].forEach(e=>{t.addEventListener(e,n,!1)}),["dragleave","drop"].forEach(e=>{t.addEventListener(e,o,!1)}),t.addEventListener("drop",(function(t){let e=t.dataTransfer.files[0];window.URL.createObjectURL(e);const n=new FileReader;n.addEventListener("load",r),n.readAsText(e)}),!1)}),[]}class gt extends q{constructor(t){super(),U(this,t,pt,null,c,{})}}function ht(t){let e,n,r,c,a;const f=new gt({});return{c(){e=u("div"),n=u("textarea"),r=d(),B(f.$$.fragment),$(n,"name","editor"),$(n,"id","editor"),$(n,"cols","30"),$(n,"rows","10"),$(e,"class","editor-text-container")},m(o,s){i(o,e,s),l(e,n),p(n,t[0]),l(e,r),F(f,e,null),c=!0,a=[m(n,"input",t[2]),m(n,"keydown",vt),m(n,"keyup",t[1])]},p(t,[e]){1&e&&p(n,t[0])},i(t){c||(C(f.$$.fragment,t),c=!0)},o(t){R(f.$$.fragment,t),c=!1},d(t){t&&s(e),O(f),o(a)}}}function vt(t){if(9==t.keyCode||9==t.which){t.preventDefault();var e=this.selectionStart;this.value=this.value.substring(0,this.selectionStart)+"\t"+this.value.substring(this.selectionEnd),this.selectionEnd=e+1}}function yt(t,e,n){let o=localStorage.getItem("content");return[o,function(t){localStorage.setItem("content",o)},function(){o=this.value,n(0,o)}]}class wt extends q{constructor(t){super(),U(this,t,yt,ht,c,{})}}function xt(e){let n,o,r,c,a;const f=new wt({}),m=new $t({});return{c(){n=u("main"),o=u("div"),B(f.$$.fragment),r=d(),c=u("div"),B(m.$$.fragment),$(o,"class","editor-container"),$(c,"class","footer-container"),$(n,"id","main")},m(t,e){i(t,n,e),l(n,o),F(f,o,null),l(n,r),l(n,c),F(m,c,null),a=!0},p:t,i(t){a||(C(f.$$.fragment,t),C(m.$$.fragment,t),a=!0)},o(t){R(f.$$.fragment,t),R(m.$$.fragment,t),a=!1},d(t){t&&s(n),O(f),O(m)}}}function bt(t){let e=localStorage.getItem("theme");e||(e="default");let n=`/themes/${e}.css`;return fetch(n).then(t=>{let e=t.ok?n:"/themes/default.css";document.getElementById("stylesheet").href=e}),[]}return new class extends q{constructor(t){super(),U(this,t,bt,xt,c,{})}}({target:document.body,props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map
