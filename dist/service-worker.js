if(!self.define){let i,s={};const e=(e,t)=>(e=new URL(e+".js",t).href,s[e]||new Promise((s=>{if("document"in self){const i=document.createElement("script");i.src=e,i.onload=s,document.head.appendChild(i)}else i=e,importScripts(e),s()})).then((()=>{let i=s[e];if(!i)throw new Error(`Module ${e} didn’t register its module`);return i})));self.define=(t,n)=>{const l=i||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let r={};const u=i=>e(i,l),c={module:{uri:l},exports:r,require:u};s[l]=Promise.all(t.map((i=>c[i]||u(i)))).then((i=>(n(...i),r)))}}define(["./workbox-460519b3"],(function(i){"use strict";self.skipWaiting(),i.clientsClaim(),i.precacheAndRoute([{url:"./static/js/lib.6c62d410e5.js",revision:null},{url:"index.html",revision:"9192e70757db02aeb21784ca33c11823"},{url:"static/css/main.53cb779422.css",revision:null},{url:"static/js/app.69370ae6e8.js",revision:null},{url:"static/js/count.chunk.b04b2cf151.js",revision:null},{url:"static/js/main.6e6bbf9988.js",revision:null},{url:"static/js/runtime~app.js.c56b3d25d7.js",revision:null},{url:"static/js/runtime~main.js.8a6dad5b95.js",revision:null},{url:"static/media/a25d01ed22.woff2",revision:null},{url:"static/media/ba0331b9c8.woff",revision:null},{url:"static/media/bec2970c22.ttf",revision:null}],{})}));
//# sourceMappingURL=service-worker.js.map
