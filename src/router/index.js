import Vue from 'vue'
import Router from 'vue-router'
import menu from './menu'
import store from "@/store"

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
    },
    {
        path:"/index/404",
        component:()=>import("@/pages/index/404"),
    },

    // 类似于路由表的默认规则
    {
        path:"*",
        redirect:"/index/404"
    },
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

const router = new Router({
  routes: routes
})

router.beforeEach((to, from, next) => {
    let gotoLogon = false;
    if(to.query.redirect){
        store.commit('uri/setRedirect',to.query.redirect);
    }

    if (to.meta && to.meta.privilege && Array.isArray(to.meta.privilege)) {
        let pagePrivilege = to.meta.privilege;
        let userPrivilege = store.state.userInfo.privilege;
        let hasPrivilege = false;
        for(var i=0,len=userPrivilege.length;i<len;i++){
            var priItem = userPrivilege[i];
            if(pagePrivilege.includes(priItem)){
                hasPrivilege = true;
                break;
            }
        }
        if(!hasPrivilege){
            gotoLogon = true;
        }
    }
    let title = "admin";
    if(to.meta && to.meta.title){
        title = to.meta.title
    }
    store.commit("title/updateTitie",title);

    if(gotoLogon){
        next({
            path: '/index/login',
            query: {redirect: to.fullPath}
        })
    }else{
        let uriarr = to.path.replace(/^\//,'').split('/')
        store.commit('uri/updateBasicUri',{
            controller_name:uriarr[0],
            method_name:uriarr[1],
            path:to.path,
        });
        next();
    }
})


export default router