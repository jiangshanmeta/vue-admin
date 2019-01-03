import Vue from 'vue'
import Router from 'vue-router'
import menu from './menu'
import store from "@/store"

Vue.use(Router)

const routes = [];

menu.forEach(({pages=[]})=>{
    pages.forEach((page)=>{
        routes.push(page);
    });
})



const router = new Router({
    routes
})

router.beforeEach((to, from, next) => {
    if(to.query.redirect){
        store.commit('uri/setRedirect',to.query.redirect);
    }

    const gotoLogin = do {
        if(to.meta && to.meta.privilege && Array.isArray(to.meta.privilege)){
            const pagePrivilege = to.meta.privilege;
            const userPrivilege = store.state.userInfo.privilege;
            pagePrivilege.every((priItem)=>{
                return !userPrivilege.includes(priItem);
            });
        }else{
            false;
        }
    }

    if(gotoLogin){
        next({
            path: '/index/login',
            query: {redirect: to.fullPath}
        })
    }else{
        const uriarr = to.path.replace(/^\//,'').split('/');
        const title = do {
            if(to.meta && to.meta.title){
                to.meta.title;
            }else{
                "admin";
            }
        }
        store.commit("title/updateTitie",title);
        store.commit('uri/updateBasicUri',{
            controller_name:uriarr[0],
            method_name:uriarr[1],
            path:to.path,
        });
        next();
    }
})


export default router