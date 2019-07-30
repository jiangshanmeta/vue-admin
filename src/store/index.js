import Vue from 'vue';
import Vuex from 'vuex';

import {
    doLogin, getUserInfo, doLogout,
} from '@/server/index';

import test from './test';
import userInfo from './userInfo';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        test,
        userInfo,
    },
    state: {
        isLogin: true,
        title: 'admin',
    },
    mutations: {
        setLogin (state) {
            state.isLogin = true;
        },
        setLogout (state) {
            Vue.localStorage.remove('token');
            state.isLogin = false;
        },
        setTitie (state, title) {
            state.title = title;
        },
    },
    actions: {
        doLogin ({
            dispatch,
        }, data) {
            doLogin(data).then((json) => {
                Vue.localStorage.set('token', json.data.token);
                dispatch('getUserInfo');
            });
        },
        getUserInfo ({
            commit,
        }) {
            return getUserInfo().then((json) => {
                commit('setLogin');
                commit('userInfo/initUserInfo', json.data);
            });
        },
        doLogout ({
            commit,
        }) {
            return doLogout().then(() => {
                commit('setLogout');
                commit('userInfo/resetUserInfo');
            });
        },

    },
});
