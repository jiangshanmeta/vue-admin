<template>
    <quill-editor
        v-model="model"
    ></quill-editor>
</template>

<script>
import _computed_model_mixin from "./_computed_model_mixin.js"
import _props_value_mixin from "./_props_value_mixin.js"

export default{
    name:"field_text_rich",
    inheritAttrs:true,
    components:{
        quillEditor,
        quillEditor:import("vue-quill-editor"),
    },
    mixins:[
        _computed_model_mixin,
        _props_value_mixin,
    ],
}
</script>