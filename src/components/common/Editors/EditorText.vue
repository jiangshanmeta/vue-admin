<template>
    <el-input
        v-model="model"
        type="textarea"
        v-bind="$attrs"
    />
</template>

<script>
import _editor_model_mixin from './_editor_model_mixin';

export default {
    name: 'EditorText',
    mixins: [
        _editor_model_mixin,
    ],
    inheritAttrs: true,
};
</script>
