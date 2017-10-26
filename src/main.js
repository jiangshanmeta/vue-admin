// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import Vuex from 'vuex'
Vue.use(Vuex)

// cookie && localstorage
import VueCookie from 'vue-cookie'
Vue.use(VueCookie)
import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage)

import axios from "@/server/axios.js"
Vue.prototype.$axios = axios


// import lodash from 'lodash'
// Vue.prototype.$_ = lodash

// 处理element ui库
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(Element)

// canvas库
import 'echarts'
import ECharts from 'vue-echarts/components/ECharts.vue'
Vue.component('chart', ECharts)



import router from './router'

let store = new Vuex.Store({
    state:{
        isLogin:false,
        uri:{
            controller_name:'',
            method_name:'',
            path:'',
        },
        userInfo:{
            name:'',
            privilege:[],
        },
        title:"admin",
    },
    mutations:{
        updateUri(state,payload){
            state.uri.controller_name = payload.controller_name;
            state.uri.method_name = payload.method_name;
            state.uri.path = payload.path;
        },
        updateTitie(state,title){
            state.title = title;
        },
        setToken (state,token){
            Vue.localStorage.set('token',token)
        },
        doLogout (state){
            Vue.localStorage.remove('token')
            state.isLogin = false;
            state.userInfo.name = '';
            state.userInfo.privilege = [];
            instance.$router.push({
                path:'/index/login'
            })
        },
        getUserInfo (state,data){
            let keys = Object.keys(data);
            keys.forEach((key)=>{
                state['userInfo'][key] = data[key]
            })
            state.isLogin = true;
        },
    },
    actions:{
        doLogout({commit}){
            return axios.post('/index/doLogout').then(()=>{
                commit('doLogout')
            })
        },
        getUserInfo({commit}){
            return axios.get('/index/getUserInfo').then((json)=>{
                commit('getUserInfo',json.data);
            })
        }
    },

})


router.beforeEach((to, from, next) => {
    let gotoLogon = false;
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

    if(to.meta && to.meta.title){
        store.commit("updateTitie",to.meta.title)
    }else{
        store.commit("updateTitie","admin")
    }

    if(gotoLogon){
        next({
            path: '/index/login',
            query: {redirect: to.fullPath}
        })
    }else{
        let uriarr = to.path.replace(/^\//,'').split('/')
        store.commit('updateUri',{
            controller_name:uriarr[0],
            method_name:uriarr[1],
            path:to.path,
        });
        next();
    }



})



Vue.config.productionTip = false

import topNav from '@/components/common/topnav'
import sideMenu from "@/components/common/menu"
import bottomFooter from "@/components/common/footer"
import vueTitle from "@/widget/title.vue"

import './assets/css/bootstrap-grid.min.css';
import './assets/css/bootstrap-reboot.min.css';
import './assets/css/lib.css';

/* eslint-disable no-new */
let instance = new Vue({
    el: '#app',
    router,
    store,
    components: { 
        topNav,
        sideMenu,
        bottomFooter,
        vueTitle,
    },
    created (){
        if(this.$localStorage.get('token') && !this.$store.state.isLogin){
            this.$store.dispatch('getUserInfo')
        }
    },
})
window.__INSTANCE__ = instance