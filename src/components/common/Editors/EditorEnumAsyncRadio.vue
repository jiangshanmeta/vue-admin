<template>
    <EditorEnumRadio
        v-model="model"
        :candidate="candidate"
        :is-candidate-valid="!isRequest"
        v-bind="$attrs"
    />
</template>

<script>
import _props_value_mixin from './_props_value_mixin';
import _editor_model_mixin from './_editor_model_mixin.js';
import _async_candidate_mixin from './_async_candidate_mixin.js';

export default {
    name: 'EditorEnumAsyncRadio',
    components: {
        EditorEnumRadio: () => import('./EditorEnumRadio'),
    },
    mixins: [
        _editor_model_mixin,
        _async_candidate_mixin,
        _props_value_mixin,
    ],
    inheritAttrs: true,
};
</script>
