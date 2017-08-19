import Vue from 'vue'
import Router from 'vue-router'
import menu from './menu'

Vue.use(Router)

let routes = [
    {
        path:"/index/test",
        component:resolve=>require(["@/pages/index/test"],resolve),
    }


    // {
    //     path:'/',
    //     redirect:'/index/index',
    // },
    // {
    //     path:'/index/login',
    //     component:resolve=>require(['@/pages/index/login'],resolve),
    // }
];

// console.log(menu)

// menu.forEach((item)=>{
//     let controller_name = '/' + item.controller_name + '/';
//     let children = item.children || [];
//     children.forEach((child)=>{
//         let uri = controller_name + child.method_name;
//         let pagepath = "@/pages" + (child.pagepath?child.pagepath:uri );

//         routes.push({
//             path:uri,

//             component:child.component,
//             meta:child.meta,
//         })
//     })
// })

// console.log(routes)


export default new Router({
  routes: routes
})
