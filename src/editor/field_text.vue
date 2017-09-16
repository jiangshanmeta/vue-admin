<template>
    <el-input 
        type="textarea" 
        v-model="model"
        :placeholder="placeholder"
    ></el-input>
</template>

<script>
import field_string_mixin from "./field_string_mixin.js"
import _computed_model_mixin from "./_computed_model_mixin.js"
import _props_placeholder_mixin from "./_props_placeholder_mixin.js"

export default{
    name:'field_text',
    mixins:[
        field_string_mixin,
        _computed_model_mixin,
        _props_placeholder_mixin,
    ],
}
</script>