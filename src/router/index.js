import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import { sync } from 'vuex-router-sync'
import menu from './menu'
import store from "@/store"

Vue.use(Router)
Vue.use(Meta)



const routes = menu.reduce((routes,{pages=[]})=>{
    routes.push(...pages);
    return routes;
},[]);

const router = new Router({
    routes
})

sync(store, router)

router.beforeEach((to, from, next) => {

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
        const title = do {
            if(to.meta && to.meta.title){
                to.meta.title;
            }else{
                "admin";
            }
        }
        
        store.commit("setTitie",title);

        next();
    }
})


export default router