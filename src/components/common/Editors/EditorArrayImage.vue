<template>
    <EditorArrayFile
        v-model="model"
        accept="image/gif,image/jpeg,image/jpg,image/png"
        v-bind="$attrs"
    />
</template>

<script>
import _editor_model_mixin from './_editor_model_mixin';
import _props_value_array_mixin from './_props_value_array_mixin';

export default {
    name: 'EditorArrayImage',
    components: {
        EditorArrayFile: () => import('./EditorArrayFile'),
    },
    mixins: [
        _editor_model_mixin,
        _props_value_array_mixin,
    ],
    inheritAttrs: true,
};
</script>
