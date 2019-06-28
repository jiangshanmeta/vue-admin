<template>
    <EditorEnumSelect
        v-model="model"
        :candidate="candidate"
        :is-candidate-valid="!isRequest"
        v-bind="$attrs"
    >
        <template>
            <slot />
        </template>
    </EditorEnumSelect>
</template>

<script>
import _async_candidate_mixin from './_async_candidate_mixin.js';
import _props_value_mixin from './_props_value_mixin';
import _editor_model_mixin from './_editor_model_mixin.js';

export default {
    name: 'EditorEnumAsyncSelect',
    components: {
        EditorEnumSelect: () => import('./EditorEnumSelect'),
    },
    mixins: [
        _async_candidate_mixin,
        _props_value_mixin,
        _editor_model_mixin,
    ],
    inheritAttrs: true,
};
</script>
