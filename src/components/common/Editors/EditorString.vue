<template>
    <el-input
        v-model="model"
        v-bind="$attrs"
        type="input"
    />
</template>

<script>
import _computed_model_mixin from './_computed_model_mixin';

export default {
    name: 'EditorString',
    mixins: [
        _computed_model_mixin,
    ],
    inheritAttrs: true,
};
</script>
