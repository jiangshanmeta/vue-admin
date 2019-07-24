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
                import('@/models/' + to.meta.model + '.js').then(({
                    default: defaultModel,
                }) => {
                    vm.model = deepFreeze(typeof defaultModel === 'function' ? defaultModel.call(vm) : defaultModel);
                    vm.modelLoaded = true;
                });
            }
        });
    },
};
