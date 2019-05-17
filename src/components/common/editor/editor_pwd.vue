<template>
    <el-input
        v-model="model"
        v-bind="$attrs"
        type="password"
    />
</template>

<script>
import _computed_model_mixin from './_computed_model_mixin'

export default {
    name: 'EditorPwd',
    mixins: [
        _computed_model_mixin,
    ],
    inheritAttrs: true,
}
</script>
