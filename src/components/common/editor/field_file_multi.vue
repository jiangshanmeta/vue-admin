<template>
    <meta-upload
        v-model="model"
        v-bind="$attrs"
    >
        <template #default>
            <slot name="default">
                <el-button size="small" type="primary">点击上传</el-button>
            </slot>
        </template>
        <template #tip>
            <slot name="tip"></slot>
        </template>
    </meta-upload>
</template>

<script>
import metaUpload from "./meta-upload"
import _computed_model_mixin from "./_computed_model_mixin"
import _props_value_array_mixin from "./_props_value_array_mixin"

export default{
    name:"field_file_multi",
    inheritAttrs:true,
    components:{
        metaUpload,
    },
    mixins:[
        _computed_model_mixin,
        _props_value_array_mixin,
    ],
}
</script>