<template>
    <EditorEnumAutocomplete
        v-model="model"
        :candidate="finalOptions"
        :is-candidate-valid="hasCachedOptions"
        v-bind="$attrs"
    />
</template>

<script>
import _editor_relates_mixin from './_editor_relates_mixin';
import _editor_model_mixin from './_editor_model_mixin';

export default {
    name: 'EditorEnumRelatesAutocomplete',
    components: {
        EditorEnumAutocomplete: () => import('./EditorEnumAutocomplete'),
    },
    mixins: [
        _editor_relates_mixin,
        _editor_model_mixin,
    ],
    inheritAttrs: true,
};
</script>
