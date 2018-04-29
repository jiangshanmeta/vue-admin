<template>
    <field_file
        v-model="model"
        
        v-bind="$attrs"
    ></field_file>
</template>

<script>
import field_file from "./field_file"
import _mono_multi_mixin from "./_mono_multi_mixin"

export default{
    name:"field_file_mono",
    inheritAttrs:true,
    components:{
        field_file
    },
    mixins:[
        _mono_multi_mixin,
    ],
    props:{
        value:{
            type:[Object,String],
            required:true,
        },
    },
}
</script>