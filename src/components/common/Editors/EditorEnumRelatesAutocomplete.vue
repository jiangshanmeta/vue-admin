<template>
    <EditorEnumAutocomplete
        v-model="model"
        :candidate="finalOptions"
        :is-candidate-valid="hasCachedOptions"
        v-bind="$attrs"
    />
</template>

<script>
import _editor_relates_mixin from './_editor_relates_mixin.js';
import _computed_model_mixin from './_computed_model_mixin.js';

export default {
    name: 'EditorEnumRelatesAutocomplete',
    components: {
        EditorEnumAutocomplete: () => import('./EditorEnumAutocomplete'),
    },
    mixins: [
        _editor_relates_mixin,
        _computed_model_mixin,
    ],
    inheritAttrs: true,
};
</script>
