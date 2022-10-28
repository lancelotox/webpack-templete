import './css/index.css';
import './css/index.sass';
import { debounce } from 'z-util-page';

window.out = debounce(function(){
    console.log(1);
}, 200);

out();

//js模块热更新
if(module.hot){
    module.hot.accept("./js/reduce.js");
}

//js按需引入
let btn = document.createElement('input');
btn.setAttribute('type', 'button');
btn.addEventListener('click', function(){
    import(/* webpackChunkName: "count" */'./js/count').then(function(res){
        console.log(res);
    })
});
document.body.appendChild(btn);

//PWA
// if("serviceWorker" in navigator){
//     window.addEventListener("load", ()=>{
//         navigator.serviceWorker
//             .register("./service-worker.js")
//             .then(registration=>{
//                 console.log("SW: registered: ", registration);
//             })
//             .catch(error=>{
//                 console.log("SW: registration faild: ", error);
//             })
//     })
// }