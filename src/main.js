import Vue from 'vue'

// cookie && localstorage
import VueCookie from 'vue-cookie'
Vue.use(VueCookie)
import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage)


import VueConfig from "@/widget/vue-config.js"
Vue.use(VueConfig,{
    optionKeys:['config','staticMethod','state']
})

import router from './router'
import store from "./store"


// 处理element ui库
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element)

Vue.config.productionTip = false


import '@/assets/css/bootstrap-reboot.min.css';
import '@/assets/css/layout.css';
import '@/assets/css/display.css';
import '@/assets/css/text.css';
import '@/assets/css/img.css';
import '@/assets/css/table.css';
import '@/assets/css/lib.css';

import App from './App'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render(h){
        return h('App');
    },
    components:{
        App,
    },
})