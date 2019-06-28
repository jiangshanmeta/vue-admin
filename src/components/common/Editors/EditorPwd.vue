<template>
    <el-input
        v-model="model"
        v-bind="$attrs"
        type="password"
    />
</template>

<script>
import _editor_model_mixin from './_editor_model_mixin';

export default {
    name: 'EditorPwd',
    mixins: [
        _editor_model_mixin,
    ],
    inheritAttrs: true,
};
</script>
