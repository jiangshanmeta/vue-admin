import axios from 'axios'
import qs from 'qs'
import Vue from "vue"
import store from "@/store"
import router from "@/router"

const axiosIns = axios.create({});
axiosIns.defaults.baseURL = process.env.baseUrl;
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
    const token = Vue.localStorage.get('token');
    if(token){
        config.headers.Token = token;
    }
    return config;
})
axiosIns.interceptors.response.use(function(response){
    const data = response.data;
    const status = response.status;
    if(status===200 || status === 304){
        const rstno = data.rstno;
        if(rstno>0){
            return data;
        }
        return Promise.reject(response);
    }else{
        if(status===412){
            store.dispatch('doLogout')
            router.push({
                path:'/index/login',
                query:{'redirect':store.state.uri.path},
            })
        }
        return Promise.reject(response);
    }
})

const ajaxMethod = ['get','post'];
const api = {};
ajaxMethod.forEach((method)=>{
    api[method] = function(uri,data,config){
        return new Promise(function(resolve,reject){
            axiosIns[method](uri,data,config).then((json)=>{
                resolve(json);
            }).catch((response)=>{
                if(response.status===200 && response.data.rstno<0){
                    Vue.prototype.$message(response.data.data.err.msg)
                }
            })
        })
    }
})

Object.freeze(api);

export default api;