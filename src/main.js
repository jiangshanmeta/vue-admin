import Vue from 'vue';

// cookie && localstorage
import VueCookie from 'vue-cookie';
import VueLocalStorage from 'vue-localstorage';

import VueConfigs from 'vue-configs';
import VueSingleton from '@/plugins/vue-singleton';

import router from './router';
import store from './store';

// 处理element ui库
import 'normalize.css';
import '@/assets/css/layout.css';
import '@/assets/css/text.css';
import '@/assets/css/img.css';
import '@/assets/css/table.css';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App';
Vue.use(VueCookie);
Vue.use(VueLocalStorage);
Vue.use(VueConfigs, {
    optionKeys: [
        'config',
        'staticMethod',
        'state',
        'singleton',
    ],
});
Vue.use(VueSingleton);
Vue.use(Element);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App,
    },
    render (h) {
        return h('App');
    },
});
