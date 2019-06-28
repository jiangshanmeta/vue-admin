<template>
    <EditorArrayAutocomplete
        v-model="model"
        v-bind="$attrs"
        :candidate="finalOptions"
        :is-candidate-valid="hasCachedOptions"
    />
</template>

<script>
import _editor_relates_mixin from './_editor_relates_mixin';
import _editor_model_mixin from './_editor_model_mixin';
import _props_value_array_mixin from './_props_value_array_mixin';

export default {
    name: 'EditorArrayRelatesAutocomplete',
    components: {
        EditorArrayAutocomplete: () => import('./EditorArrayAutocomplete'),
    },
    mixins: [
        _editor_relates_mixin,
        _editor_model_mixin,
        _props_value_array_mixin,
    ],
    inheritAttrs: true,
};
</script>
