<template>
    <el-input
        v-model="model"
        type="textarea"
        v-bind="$attrs"
    />
</template>

<script>
import _computed_model_mixin from './_computed_model_mixin'

export default {
    name: 'EditorText',
    mixins: [
        _computed_model_mixin,
    ],
    inheritAttrs: true,
}
</script>
