<template>
    <el-input 
        v-model="model"
        v-bind="$attrs"
        type="input"
    ></el-input>
</template>

<script>
import _computed_model_mixin from "./_computed_model_mixin"

export default{
    name:"editor_string",
    inheritAttrs:true,
    mixins:[
        _computed_model_mixin,
    ],
}
</script>