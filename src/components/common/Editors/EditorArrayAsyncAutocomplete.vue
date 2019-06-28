<template>
    <EditorArrayAutocomplete
        v-model="model"
        :candidate="candidate"
        :is-candidate-valid="!isRequest"
        v-bind="$attrs"
    />
</template>

<script>
import _async_candidate_mixin from './_async_candidate_mixin';
import _editor_model_mixin from './_editor_model_mixin';
import _props_value_array_mixin from './_props_value_array_mixin';

export default {
    name: 'EditorArrayAsyncAutocomplete',
    components: {
        EditorArrayAutocomplete: () => import('./EditorArrayAutocomplete'),
    },
    mixins: [
        _async_candidate_mixin,
        _editor_model_mixin,
        _props_value_array_mixin,
    ],
    inheritAttrs: true,
};
</script>
