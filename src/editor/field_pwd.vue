<template>
    <el-input v-model="model" :placeholder="placeholder" type="password"></el-input>
</template>

<script>
import field_string_mixin from "./field_string_mixin.js"
import _model_mixin from "./_model_mixin.js"
export default{
    name:'field_pwd',
    mixins:[field_string_mixin,_model_mixin],
}
</script>