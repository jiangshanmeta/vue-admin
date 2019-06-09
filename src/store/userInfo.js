export default {
    namespaced: true,
    state: {
        name: '',
    },
    mutations: {
        resetUserInfo (state) {
            state.name = '';
        },
        initUserInfo (state, data) {
            const keys = Object.keys(state);
            keys.forEach((key) => {
                state[key] = data[key];
            });
        },
    },
};
