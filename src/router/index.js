import Vue from 'vue'
import Router from 'vue-router'
import menu from './menu'
import store from "@/store"

Vue.use(Router)

let routes = [];

Object.keys(menu).forEach((moduleName)=>{
    let pages = menu[moduleName].pages || [];
    pages.forEach((page)=>{
        routes.push(page);
    });
});


const router = new Router({
    routes
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