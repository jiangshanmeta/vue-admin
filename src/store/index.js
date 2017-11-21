import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

import {doLogin,getUserInfo,doLogout} from "@/server/index.js"

import title from "./title.js"
import uri from "./uri.js"
import userInfo from "./userInfo.js"

export default new Vuex.Store({
    modules:{
        title,
        uri,
        userInfo,
    },
    state:{
        isLogin:false,
    },
    mutations:{
        setLogin(state){
            state.isLogin = true;
        },
        setLogout (state){
            Vue.localStorage.remove('token')
            state.isLogin = false;
        },
    },
    actions:{
        doLogin({dispatch},data){
            doLogin(data).then((json)=>{
                Vue.localStorage.set('token',json.data.token);
                dispatch('getUserInfo')
            })
        },
        getUserInfo({commit}){
            return getUserInfo().then((json)=>{
                commit('setLogin');
                commit('userInfo/initUserInfo',json.data);
            })
        },
        doLogout({commit}){
            return doLogout().then(()=>{
                commit('setLogout');
                commit('userInfo/resetUserInfo');
                commit('uri/setRedirect');
            })
        },

    },
})