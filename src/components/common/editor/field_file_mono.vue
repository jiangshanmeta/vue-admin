<template>
    <field_file_multi
        v-model="model"
        v-bind="$attrs"
    ></field_file_multi>
</template>

<script>
import _mono_multi_mixin from "./_mono_multi_mixin"

export default{
    name:"field_file_mono",
    inheritAttrs:true,
    components:{
        field_file_multi:()=>import("./field_file_multi"),
    },
    mixins:[
        _mono_multi_mixin,
    ],
}
</script>