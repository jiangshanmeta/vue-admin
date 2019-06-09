<template>
    <FilterEnumAutocomplete
        v-model="model"
        v-bind="$attrs"
        :candidate="candidate"
    />
</template>

<script>
import _async_candidate_mixin from '../Editors/_async_candidate_mixin';
import _computed_model_mixin from '../Editors/_computed_model_mixin';

export default {
    name: 'FilterEnumAsyncAutocomplete',
    components: {
        FilterEnumAutocomplete: () => import('./FilterEnumAutocomplete'),
    },
    mixins: [
        _async_candidate_mixin,
        _computed_model_mixin,
    ],
    inheritAttrs: true,
};
</script>
