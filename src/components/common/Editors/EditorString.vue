<template>
    <el-input
        v-model="model"
        v-bind="$attrs"
        type="input"
    />
</template>

<script>
import _editor_model_mixin from './_editor_model_mixin';

export default {
    name: 'EditorString',
    mixins: [
        _editor_model_mixin,
    ],
    inheritAttrs: true,
};
</script>
