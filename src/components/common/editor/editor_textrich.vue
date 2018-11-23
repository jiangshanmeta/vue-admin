<template>
    <quill-editor
        v-model="model"
    ></quill-editor>
</template>

<script>
import _computed_model_mixin from "./_computed_model_mixin"

import {quillEditor} from "vue-quill-editor"

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