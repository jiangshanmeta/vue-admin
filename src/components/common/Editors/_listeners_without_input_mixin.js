export default {
    computed: {
        listenersWithoutInput () {
            const listeners = {
                ...this.$listeners,
            };
            delete listeners.input;
            return listeners;
        },
    },
};
