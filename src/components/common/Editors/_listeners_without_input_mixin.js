export default {
    computed: {
        listenersWithoutInput () {
            const listeners = Object.assign({}, this.$listeners);
            delete listeners.input;
            return listeners;
        },
    },
};
