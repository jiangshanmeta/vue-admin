<template>
    <el-input 
        v-model="model" 
        v-bind="$attrs"
        type="password"
    ></el-input>
</template>

<script>
import _props_value_mixin from "./_props_value_mixin.js"
import _computed_model_mixin from "./_computed_model_mixin.js"

export default{
    name:'field_pwd',
    mixins:[
        _props_value_mixin,
        _computed_model_mixin,
    ],
}
</script>