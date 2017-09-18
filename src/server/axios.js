import axios from 'axios'
import qs from 'qs'
import Vue from "vue"
let axiosIns = axios.create({});
if(process.env.NODE_ENV == 'development'){
    axiosIns.defaults.baseURL = 'http://localhost:8080/mock'
}else{
    
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
            window.__INSTANCE__.$store.dispatch('doLogout')
            window.__INSTANCE__.$router.push({
                path:'/index/login',
                query:{'redirect':window.__INSTANCE__.$route.fullPath},
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
                    window.__INSTANCE__.$message(response.data.data.err.msg);
                }
            })
        })
    }
})

export default api;