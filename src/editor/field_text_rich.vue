<template>
    <quill-editor
        v-model="model"
    ></quill-editor>
</template>

<script>
// 富文本编辑器
import { quillEditor } from 'vue-quill-editor'
import _computed_model_mixin from "./_computed_model_mixin.js"
import _props_value_mixin from "./_props_value_mixin.js"

export default{
    components:{
        quillEditor
    },
    mixins:[
        _computed_model_mixin,
        _props_value_mixin,
    ],
}
</script>