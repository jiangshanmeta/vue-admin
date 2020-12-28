import {
    deepFreeze,
} from '@/widget/utility';

export default {
    data () {
        return {
            model: {},
            modelLoaded: false,
        };
    },
    beforeRouteEnter (to, from, next) {
        next((vm) => {
            vm.modelLoaded = false;
            if (to.meta && to.meta.model) {
                import('@/models/' + to.meta.model).then(({
                    default: defaultModel,
                }) => {
                    const {
                        fields,
                        pages: {
                            list,
                        },
                    } = typeof defaultModel === 'function' ? defaultModel.call(vm) : defaultModel;
                    vm.model = deepFreeze({
                        fields,
                        ...list,
                    });

                    vm.modelLoaded = true;
                });
            }
        });
    },
};
