<template>
    <el-input v-model="model" :placeholder="placeholder"></el-input>
</template>

<script>
import field_string_mixin from "./field_string_mixin.js"
import _model_mixin from "./_model_mixin.js"

export default{
    name:'field_string',
    mixins:[field_string_mixin,_model_mixin],
}
</script>