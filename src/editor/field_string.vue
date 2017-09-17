<template>
    <el-input v-model="model" :placeholder="placeholder"></el-input>
</template>

<script>
import _computed_model_mixin from "./_computed_model_mixin.js"
import _props_placeholder_mixin from "./_props_placeholder_mixin.js"
import _props_value_mixin from "./_props_value_mixin.js"
export default{
    name:'field_string',
    mixins:[
        _computed_model_mixin,
        _props_placeholder_mixin,
        _props_value_mixin,
    ],
}
</script>