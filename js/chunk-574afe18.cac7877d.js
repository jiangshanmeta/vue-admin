(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-574afe18"],{"21a6":function(e,t,n){(function(n){var o,a,r;(function(n,i){a=[],o=i,r="function"===typeof o?o.apply(t,a):o,void 0===r||(e.exports=r)})(0,(function(){"use strict";function t(e,t){return"undefined"==typeof t?t={autoBom:!1}:"object"!=typeof t&&(console.warn("Deprecated: Expected third argument to be a object"),t={autoBom:!t}),t.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\ufeff",e],{type:e.type}):e}function o(e,t,n){var o=new XMLHttpRequest;o.open("GET",e),o.responseType="blob",o.onload=function(){c(o.response,t,n)},o.onerror=function(){console.error("could not download file")},o.send()}function a(e){var t=new XMLHttpRequest;t.open("HEAD",e,!1);try{t.send()}catch(e){}return 200<=t.status&&299>=t.status}function r(e){try{e.dispatchEvent(new MouseEvent("click"))}catch(o){var t=document.createEvent("MouseEvents");t.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),e.dispatchEvent(t)}}var i="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof n&&n.global===n?n:void 0,l=i.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),c=i.saveAs||("object"!=typeof window||window!==i?function(){}:"download"in HTMLAnchorElement.prototype&&!l?function(e,t,n){var l=i.URL||i.webkitURL,c=document.createElement("a");t=t||e.name||"download",c.download=t,c.rel="noopener","string"==typeof e?(c.href=e,c.origin===location.origin?r(c):a(c.href)?o(e,t,n):r(c,c.target="_blank")):(c.href=l.createObjectURL(e),setTimeout((function(){l.revokeObjectURL(c.href)}),4e4),setTimeout((function(){r(c)}),0))}:"msSaveOrOpenBlob"in navigator?function(e,n,i){if(n=n||e.name||"download","string"!=typeof e)navigator.msSaveOrOpenBlob(t(e,i),n);else if(a(e))o(e,n,i);else{var l=document.createElement("a");l.href=e,l.target="_blank",setTimeout((function(){r(l)}))}}:function(e,t,n,a){if(a=a||open("","_blank"),a&&(a.document.title=a.document.body.innerText="downloading..."),"string"==typeof e)return o(e,t,n);var r="application/octet-stream"===e.type,c=/constructor/i.test(i.HTMLElement)||i.safari,s=/CriOS\/[\d]+/.test(navigator.userAgent);if((s||r&&c||l)&&"undefined"!=typeof FileReader){var u=new FileReader;u.onloadend=function(){var e=u.result;e=s?e:e.replace(/^data:[^;]*;/,"data:attachment/file;"),a?a.location.href=e:location=e,a=null},u.readAsDataURL(e)}else{var d=i.URL||i.webkitURL,f=d.createObjectURL(e);a?a.location=f:location.href=f,a=null,setTimeout((function(){d.revokeObjectURL(f)}),4e4)}});i.saveAs=c.saveAs=c,e.exports=c}))}).call(this,n("c8ba"))},"40ef":function(e,t,n){"use strict";n.r(t);n("99af"),n("a15b"),n("d81d"),n("d3b7");function o(e){e([{_id:3,storename:"北京店"},{_id:5,storename:"上海店"},{_id:7,storename:"广州店"},{_id:9,storename:"深圳店"},{_id:11,storename:"杭州店"}])}function a(e,t){var n,o=t.store;switch(o){case 3:n=[{label:"渡边早季",value:1},{label:"青沼瞬",value:5}];break;case 5:n=[{label:"秋月真理亚",value:3}];break;case 7:n=[{label:"渡边早季",value:1},{label:"秋月真理亚",value:3}];break;case 9:n=[{label:"伊东守",value:4},{label:"秋月真理亚",value:3}];break;case 11:n=[{label:"朝比奈觉",value:2},{label:"青沼瞬",value:5},{label:"秋月真理亚",value:3}];break}e(n)}var r=[{id:1,customername:"鲁鲁修",totalprice:100,address:"Ashford",store:3,saler:1}],i=r.length+1,l=["customername","totalprice","address","store","saler"];function c(e){e(l)}function s(e,t){t.id=i++,r.push(t),e()}function u(e){e({data:JSON.parse(JSON.stringify(r)),fieldList:["customername","totalprice","address","nameAddress"],total:r.length})}var d=n("21a6"),f=n.n(d);function m(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"template",n=arguments.length>2?arguments[2]:void 0;e instanceof Blob||("string"===typeof e&&(e=[e]),e=new Blob(e,n)),f.a.saveAs(e,t)}t["default"]={fields:{customername:{labelName:"客户名",editor:{name:"EditorString",config:{placeholder:"请输入客户名"},createConfig:{placeholder:"测试createconfig"},default:""},view:{join:["id"],handler:function(e){return"".concat(e.customername,"(").concat(e.id,")")}}},totalprice:{labelName:"金额",editor:{name:"EditorNumber",relates:[{relateField:["customername","address"],handler:function(e){console.log(e),"lelouch"===e.customername&&"area11"===e.address&&this.$emit("input",0)},config:{immediate:!0}}],default:0},view:{component:function(){return n.e("chunk-2d0c08a2").then(n.bind(null,"41e4"))},config:{transform:function(e){return"¥"+e}}}},address:{labelName:"收货地址",editor:{name:"EditorBookAddress",component:function(){return n.e("chunk-f6ae581a").then(n.bind(null,"eb2f"))},relates:[{relateField:"customername",propField:"customername"}],default:""},validator:"custom",view:{component:function(){return Promise.all([n.e("chunk-6e83591c"),n.e("chunk-2476af24")]).then(n.bind(null,"a82b"))},config:{breaks:!1}}},store:{labelName:"店铺",editor:{name:"EditorEnumAsyncSelect",config:{getCandidate:function(){return new Promise((function(e){o(e)}))},labelfield:"storename",valuefield:"_id"},default:""}},saler:{labelName:"销售",editor:{name:"EditorEnumRelatesSelect",config:{isValidValue:function(e){return""!==e.store},getCandidate:function(e){return new Promise((function(t){a(t,e)}))},handleRelateDataChange:function(e){console.log(e)}},relates:[{relateField:["store"],propField:"relateData"}],default:""}},nameAddress:{labelName:"用户名&收货地址",view:{join:{customername:"name",address:"position"},component:function(){return n.e("chunk-2d0b9451").then(n.bind(null,"31da"))},config:{glue:" 的收货地址是 "}}}},pages:{list:{collectionOperators:[{name:"CollectionOperatorCreate",component:function(){return Promise.all([n.e("chunk-725478c0"),n.e("chunk-83044d30"),n.e("chunk-bb30f596")]).then(n.bind(null,"e933"))},config:{getCreateFields:function(){return new Promise((function(e){c(e)}))},doCreateRequest:function(e){return new Promise((function(t){s(t,e)}))},fieldLayout:[["customername","totalprice"],["address"],["store","saler"]],triggerConfig:{text:"新建订单",type:"primary"},dialogConfig:{title:"新建订单",width:"800px"},confirmBtnConfig:{text:"确认创建",type:"success"},cancelBtnConfig:{text:"取消"}}},{handler:function(e,t){var n=t.filterData,o=t.selectedData,a=t.pagination;console.log(e),console.log(n),console.log(o),console.log(a),this.$message({type:"warning",message:"就把选中的取消选中"}),this.$emit("update")},triggerConfig:{type:"danger",text:"删除多项"}},{name:"CollectionOperatorCsv",component:function(){return Promise.all([n.e("chunk-6e83591c"),n.e("chunk-6e30c6ed")]).then(n.bind(null,"bd07"))},config:{triggerConfig:{text:"导入csv数据",type:"warning"},handleData:function(e,t){console.log(t),e()}}},{handler:function(e){var t=["customername","totalprice","address"],n=e.map((function(e){return t.map((function(t){return e[t]})).join(",")})).join("\r\n");m(n,"template.csv")},triggerConfig:{text:"下载CSV",type:"primary"}}],listConfig:{selection:!0,listRequest:function(e){return new Promise((function(t){u(t,e)}))},paginated:!1},filters:[{label:"客户名",field:"customername",filterComponent:{name:"EditorString",config:{placeholder:"请输入客户名"},default:""}},{label:"金额",field:"totalprice",filterComponent:{name:"EditorNumber",default:500},relates:[{relateField:"customername",handler:function(e){console.log(e),"lelouch"===e&&this.$emit("input",2333)},config:{immediate:!0}}]}],documentOperators:[{handler:function(e){var t=this;this.$message({message:"".concat(e.customername,"再来一单"),type:"success",duration:2e3}),setTimeout((function(){t.$emit("update")}),1e3)},triggerConfig:{text:"再来一单",type:"success",size:"small"}},{name:"DocumentOperatorLink",component:function(){return n.e("chunk-2d21a3d9").then(n.bind(null,"bb58"))},config:{tag:"el-button",getLink:function(e){return e.customername},getText:"搜索地址",triggerConfig:{size:"small",type:"primary"}}}]},create:{getCreateFields:function(){return new Promise((function(e){c(e)}))},doCreateRequest:function(e){return new Promise((function(t){s(t,e)}))},fieldLayout:[["customername","totalprice"],["address"],["store","saler"]]}}}},"99af":function(e,t,n){"use strict";var o=n("23e7"),a=n("d039"),r=n("e8b5"),i=n("861d"),l=n("7b0b"),c=n("50c4"),s=n("8418"),u=n("65f0"),d=n("1dde"),f=n("b622"),m=n("2d00"),p=f("isConcatSpreadable"),g=9007199254740991,b="Maximum allowed index exceeded",h=m>=51||!a((function(){var e=[];return e[p]=!1,e.concat()[0]!==e})),v=d("concat"),w=function(e){if(!i(e))return!1;var t=e[p];return void 0!==t?!!t:r(e)},y=!h||!v;o({target:"Array",proto:!0,forced:y},{concat:function(e){var t,n,o,a,r,i=l(this),d=u(i,0),f=0;for(t=-1,o=arguments.length;t<o;t++)if(r=-1===t?i:arguments[t],w(r)){if(a=c(r.length),f+a>g)throw TypeError(b);for(n=0;n<a;n++,f++)n in r&&s(d,f,r[n])}else{if(f>=g)throw TypeError(b);s(d,f++,r)}return d.length=f,d}})},a15b:function(e,t,n){"use strict";var o=n("23e7"),a=n("44ad"),r=n("fc6a"),i=n("a640"),l=[].join,c=a!=Object,s=i("join",",");o({target:"Array",proto:!0,forced:c||!s},{join:function(e){return l.call(r(this),void 0===e?",":e)}})},d81d:function(e,t,n){"use strict";var o=n("23e7"),a=n("b727").map,r=n("1dde"),i=n("ae40"),l=r("map"),c=i("map");o({target:"Array",proto:!0,forced:!l||!c},{map:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}})}}]);