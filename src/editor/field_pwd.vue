<template>
    <el-input v-model="model" :placeholder="placeholder" type="password"></el-input>
</template>

<script>
import field_string_mixin from "./field_string_mixin.js"
import model_mixin from "./model_mixin.js"
export default{
    mixins:[field_string_mixin,model_mixin],
}
</script>