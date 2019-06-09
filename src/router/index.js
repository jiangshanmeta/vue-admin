import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';
import {
    sync, 
} from 'vuex-router-sync';
import menu from './menu';
import store from '@/store';

Vue.use(Router);
Vue.use(Meta);

const routes = menu.reduce((routes, {
    pages = [], 
}) => {
    routes.push(...pages);
    return routes;
}, []);

const router = new Router({
    routes,
});

sync(store, router);

router.beforeEach((to, from, next) => {
    const title = do {
        if (to.meta && to.meta.title) {
            to.meta.title;
        } else {
            'admin';
        }
    };
    store.commit('setTitie', title);
    next();
});

export default router;
