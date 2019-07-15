export default {
    namespaced: true,
    state: {
        typHash: {},
    },
    mutations: {
        setTypHash (state, typHash) {
            state.typHash = typHash;
        },
    },
};
