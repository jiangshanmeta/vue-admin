<template>
    <EditorEnumRadio
        v-model="model"
        :candidate="finalOptions"
        v-bind="$attrs"
        :is-candidate-valid="hasCachedOptions"
    />
</template>

<script>
import _editor_relates_mixin from './_editor_relates_mixin';
import _editor_model_mixin from './_editor_model_mixin';

export default {
    name: 'EditorEnumRelatesRadio',
    components: {
        EditorEnumRadio: () => import('./EditorEnumRadio'),
    },
    mixins: [
        _editor_relates_mixin,
        _editor_model_mixin,
    ],
    inheritAttrs: true,
};
</script>
