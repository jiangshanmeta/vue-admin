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

// 处理ajax库axios，为了以后不重复引用，挂在原型对象上
import axios from 'axios'
import qs from 'qs'
let axiosIns = axios.create({});
if(process.env.NODE_ENV == 'development'){
    axiosIns.defaults.baseURL = 'http://little.com/index.php'
}else{
    // axiosIns.defaults.baseURL = 'http://mendian.zhuanchedao.com'
}
axiosIns.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'
axiosIns.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest'
axiosIns.defaults.responseType = 'json'
axiosIns.defaults.transformRequest = [function(data){
    return qs.stringify(data);
}
]
axiosIns.defaults.validateStatus = function(status){
    return true;
}
axiosIns.interceptors.request.use(function(config){
    config.headers.Accept = 'application/json';
    config.headers.System = 'vue';
    let token = Vue.localStorage.get('token');
    if(token){
        config.headers.Token = token;
    }
    return config;
})
axiosIns.interceptors.response.use(function(response){
    let data = response.data;
    let status = response.status;
    if(status===200 || status === 304){
        let rstno = data.rstno;
        if(rstno>0){
            return data;
        }
        return Promise.reject(response);
    }else{
        if(status===412){
            instance.$store.dispatch('doLogout')
            instance.$router.push({
                path:'/index/login',
                query:{'redirect':instance.$route.fullPath},
            })
        }
        return Promise.reject(response);
    }
})

let ajaxMethod = ['get','post'];
let api = {};
ajaxMethod.forEach((method)=>{
    api[method] = function(uri,data,config){
        return new Promise(function(resolve,reject){
            axiosIns[method](uri,data,config).then((json)=>{
                resolve(json);
            }).catch((response)=>{
                console.log(response);
                if(response.status===200 && response.data.rstno<0){
                    instance.$message(response.data.data.err.msg);
                }
            })
        })
    }
})

Vue.prototype.$axios = api

import lodash from 'lodash'
Vue.prototype.$_ = lodash

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
        },
        userInfo:{
            name:'',
            privilege:[],
        },
    },
    mutations:{
        updateUri(state,payload){
            state.uri.controller_name = payload.controller_name;
            state.uri.method_name = payload.method_name;
        },
        doLogin (state,token){
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
            for(var k in data){
                state['userInfo'][k] = data[k]
            }
            state.isLogin = true;
        },
    },
    actions:{
        doLogout({commit}){
            return api.post('/index/doLogout').then(()=>{
                commit('doLogout')
            })
        },
        getUserInfo({commit}){
            return api.get('/index/fetchUser').then((json)=>{
                commit('getUserInfo',json.data);
            })
        }
    },

})


router.beforeEach((to, from, next) => {
    let gotoLogon = false;

    if (to.meta.privilege && Array.isArray(to.meta.privilege)) {
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
        });
        next();
    }



})



Vue.config.productionTip = false

import topNav from '@/components/common/topnav'
import sideMenu from "@/components/common/menu"
import bottomFooter from "@/components/common/footer"


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
  },
    created (){
        if(this.$localStorage.get('token') && !this.$store.state.isLogin){
            this.$store.dispatch('getUserInfo')
        }
    },
})
