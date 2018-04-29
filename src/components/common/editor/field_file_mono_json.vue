<template>
    <field_file_mono
        v-model="model"
        v-bind="$attrs"
    ></field_file_mono>
</template>

<script>
import field_file_mono from "./field_file_mono"
import _json_object_mixin from "./_json_object_mixin"

export default{
    name:"field_file_mono_json",
    inheritAttrs:true,
    props:{
        struct:{
            type:Function,
            default(){
                return {}
            },
        }
    },
    components:{
        field_file_mono,
    },
    mixins:[
        _json_object_mixin
    ],
}
</script>