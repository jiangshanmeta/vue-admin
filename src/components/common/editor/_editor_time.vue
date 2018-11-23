<template>
    <el-date-picker
        :type="type"
        :valueFormat="valueFormat"
        v-model="model"
        v-bind="$attrs"
    ></el-date-picker>
</template>

<script>
import _props_value_mixin from "./_props_value_mixin.js"
import _computed_model_mixin from "./_computed_model_mixin"

export default{
    inheritAttrs:true,
    mixins:[
        _props_value_mixin,
        _computed_model_mixin,
    ],
    props:{
        type:{
            type:String,
            required:true,
        },
        valueFormat:{
            type:String,
            default:"timestamp",
        },
    },
}
</script>