<template>
    <quill-editor
        v-model="model"
    ></quill-editor>
</template>

<script>
import _computed_model_mixin from "./_computed_model_mixin.js"
import _props_value_mixin from "./_props_value_mixin.js"

import {quillEditor} from "vue-quill-editor"

export default{
    name:"field_text_rich",
    inheritAttrs:true,
    components:{
        quillEditor,
    },
    mixins:[
        _computed_model_mixin,
        _props_value_mixin,
    ],
}
</script>