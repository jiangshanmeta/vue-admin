import Vue from 'vue'
import Router from 'vue-router'
import menu from './menu'

Vue.use(Router)

let routes = [
    {
        path:"/test/test_basic",
        component:()=>import("@/pages/test/test_basic"),
    },
    {
        path:"/test/test_upload",
        component:()=>import("@/pages/test/test_upload"),
    },
    {
        path:"/test/test_ts",
        component:()=>import("@/pages/test/test_ts"),
    },
    {
        path:"/test/test_enum",
        component:()=>import("@/pages/test/test_enum"),
    },
    {
        path:"/test/test_tag",
        component:()=>import("@/pages/test/test_tag"),
    },
    {
        path:"/test/test_filter",
        component:()=>import("@/pages/test/test_filter"),
    },

    {
        path:'/',
        redirect:'/index/index',
    },
    {
        path:'/index/login',
        component:()=>import("@/pages/index/login"),
        meta:{
            title:"登录",
        }
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
