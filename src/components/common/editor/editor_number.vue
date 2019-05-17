<template>
    <el-input-number
        ref="number"
        v-model="model"
        :controls="false"
        v-bind="$attrs"
    />
</template>

<script>
import _computed_model_mixin from './_computed_model_mixin'
import _props_value_number_mixin from './_props_value_number_mixin'

export default {
    name: 'EditorNumber',
    mixins: [
        _computed_model_mixin,
        _props_value_number_mixin,
    ],
    inheritAttrs: true,
}
</script>
