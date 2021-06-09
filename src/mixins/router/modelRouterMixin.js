import {
    deepFreeze,
} from '@/widget/utility';

function genRouterMixin (pageKey) {
    return {
        data () {
            return {
                model: {},
                modelLoaded: false,
            };
        },
        beforeRouteEnter (to, from, next) {
            next((vm) => {
                vm.modelLoaded = false;

                to.meta?.model?.().then(({
                    default: defaultModel,
                }) => {
                    const model = typeof defaultModel === 'function' ? defaultModel.call(vm) : defaultModel;
                    vm.model = deepFreeze({
                        fields: model.fields,
                        ...model.pages[pageKey],
                    });
                    vm.modelLoaded = true;
                });
            });
        },

    };
}

export const listPageMixin = genRouterMixin('list');
export const infoPageMixin = genRouterMixin('info');
export const createPageMixin = genRouterMixin('create');
export const editPageMixin = genRouterMixin('edit');
