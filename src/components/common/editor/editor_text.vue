<template>
    <el-input 
        type="textarea"
        v-model="model"
        v-bind="$attrs"
    ></el-input>
</template>

<script>
import _computed_model_mixin from "./_computed_model_mixin"

export default{
    name:"editor_text",
    inheritAttrs:true,
    mixins:[
        _computed_model_mixin,
    ],
}
</script>