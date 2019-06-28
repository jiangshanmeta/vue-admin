<template>
    <FilterEnumSelect
        v-model="model"
        :candidate="finalOptions"
        :is-candidate-valid="hasCachedOptions"
        v-bind="$attrs"
    />
</template>

<script>
import _editor_relates_mixin from '../Editors/_editor_relates_mixin';
import _editor_model_mixin from '../Editors/_editor_model_mixin';

export default {
    name: 'FilterEnumRelatesSelect',
    components: {
        FilterEnumSelect: () => import('./FilterEnumSelect'),
    },
    mixins: [
        _editor_relates_mixin,
        _editor_model_mixin,
    ],
    inheritAttrs: true,
};
</script>
