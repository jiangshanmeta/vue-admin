import Vue from 'vue'
import Router from 'vue-router'
import menu from './menu'

Vue.use(Router)

let routes = [
    {
        path:"/test/test",
        component:()=>import("@/pages/test/test"),
    },
    {
        path:"/test/test2",
        component:()=>import("@/pages/test/test2"),
    },
    {
        path:"/test/test3",
        component:()=>import("@/pages/test/test3"),
    },


    {
        path:'/',
        redirect:'/index/index',
    },
    {
        path:'/index/login',
        component:()=>import("@/pages/index/login"),
    }
];

menu.forEach((item)=>{
    let children = item.children || [];
    children.forEach((child)=>{
        routes.push({
            path:child.path,
            component:child.component,
            meta:child.meta,
        })
    })
})


export default new Router({
  routes: routes
})
