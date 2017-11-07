import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

import {doLogout,getUserInfo} from "@/server/index.js"
export default new Vuex.Store({
    state:{
        isLogin:false,
        uri:{
            controller_name:'',
            method_name:'',
            path:'',
            redirect:'',
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
        setRedirect(state,redirect){
            state.uri.redirect = redirect;
        },
        setToken (state,token){
            Vue.localStorage.set('token',token)
        },
        doLogout (state){
            Vue.localStorage.remove('token')
            state.isLogin = false;
            state.userInfo.name = '';
            state.userInfo.privilege = [];
            state.uri.redirect = '';
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
            return doLogout().then(()=>{
                commit('doLogout')
            })
        },
        getUserInfo({commit}){
            return getUserInfo().then((json)=>{
                commit('getUserInfo',json.data);
            })
        }
    },
})