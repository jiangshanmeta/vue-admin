export default {
    methods: {
        mergeAttrsConfig (...configs) {
            configs = configs.filter((item) => {
                return item && typeof item === 'object';
            });

            return Object.assign({}, this.$attrs, ...configs);
        },
    },
};
