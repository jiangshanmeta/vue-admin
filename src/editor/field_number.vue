<template>
    <el-input-number
        v-model="model"
        :controls="false"
        v-bind="$attrs"
        ref="number"
    ></el-input-number>
</template>

<script>
import _props_value_number_mixin from "./_props_value_number_mixin.js"
import _computed_model_mixin from "./_computed_model_mixin.js"
export default{
    name:'field_number',
    inheritAttrs:true,
    mixins:[
        _props_value_number_mixin,
        _computed_model_mixin,
    ],
}
</script>