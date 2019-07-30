<template>
    <EditorEnumAutocomplete
        v-model="model"
        :candidate="candidate"
        :is-candidate-valid="!isRequest"
        v-bind="$attrs"
    />
</template>

<script>
import _async_candidate_mixin from './_async_candidate_mixin';
import _props_value_mixin from './_props_value_mixin';
import _editor_model_mixin from './_editor_model_mixin';

export default {
    name: 'EditorEnumAsyncAutocomplete',
    components: {
        EditorEnumAutocomplete: () => import('./EditorEnumAutocomplete'),
    },
    mixins: [
        _async_candidate_mixin,
        _props_value_mixin,
        _editor_model_mixin,
    ],
    inheritAttrs: true,
};
</script>
