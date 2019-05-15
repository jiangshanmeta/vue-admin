<template>
    <quill-editor
        v-model="model"
    ></quill-editor>
</template>

<script>
import { quillEditor } from "vue-quill-editor"
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import _computed_model_mixin from "./_computed_model_mixin"

export default{
    name:"editor_textrich",
    inheritAttrs:true,
    components:{
        quillEditor,
    },
    mixins:[
        _computed_model_mixin,
    ],
}
</script>