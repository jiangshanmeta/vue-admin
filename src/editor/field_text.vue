<template>
    <el-input 
        type="textarea" 
        v-model="model"
        :placeholder="placeholder"
    ></el-input>
</template>

<script>
import field_string_mixin from "./field_string_mixin.js"
import _model_mixin from "./_model_mixin.js"
export default{
    name:'field_text',
    mixins:[field_string_mixin,_model_mixin],
}
</script>